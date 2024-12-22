import axios from 'axios';
import {
  EtherscanResponse,
  GeneralTxItem,
  EtherscanTxItem,
  TxFilterFunction,
  SignatureCredConfig,
  CredResult,
  VerificationConfig,
} from '../../../utils/types';
import { Address, Chain, zeroAddress } from 'viem';
import { cyber } from 'viem/chains';
import { getJiffyscanTransactions, isContractAddress } from './jiffyscan';
import { createPublicClientForNetwork } from '../contractCall';

const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000;
const MAX_DELAY = 60000; // Maximum wait of 60 seconds

export async function getTransactions(
  api_key: string,
  address: Address,
  action: string,
  from: Address,
  contractAddresses: (Address | 'any')[],
  methodIds: (string | 'any')[],
  network: Chain['id'],
  startblock: string,
  endblock: string,
  txFilter: TxFilterFunction,
): Promise<GeneralTxItem[]> {
  return getTransactionsFromExplorer(
    api_key,
    address,
    action,
    from,
    contractAddresses,
    methodIds,
    network,
    startblock,
    endblock,
    txFilter,
  );
}

const ROUTESCAN_API_BASE_URL = 'https://api.routescan.io/v2/network';
const CYBER_MAINNET_ID = 7560;
function getNetworkPath(network: Chain['id']): string {
  switch (network) {
    case CYBER_MAINNET_ID:
      return 'mainnet/evm/7560';
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}

async function fetchTransactionsFromExplorer(
  network: Chain['id'],
  address: string,
  action: string,
  contractAddresses: (Address | 'any')[],
  startblock: string,
  endblock: string,
  api_key: string,
): Promise<EtherscanResponse> {
  const networkPath = getNetworkPath(network);
  const url = `${ROUTESCAN_API_BASE_URL}/${networkPath}/etherscan/api`;

  const params = new URLSearchParams({
    module: 'account',
    action: action === 'tokentx' ? 'tokentx' : 'txlist',
    address: address.toLowerCase(), // Ensure consistent address format
    startblock,
    endblock,
    page: '1',
    offset: '10000',
    sort: 'desc',
    apikey: api_key,
  });
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get<EtherscanResponse>(url, {
        params,
      });
      if (
        response.data.message === 'Max calls per sec rate limit reached (5/sec)' ||
        response.data.message === 'NOTOK'
      ) {
        const delay = Math.min(INITIAL_DELAY * Math.pow(2, retries), MAX_DELAY);
        console.log(`Rate limit reached. Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        retries++;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      if (retries === MAX_RETRIES - 1) {
        throw error;
      }
      const delay = Math.min(INITIAL_DELAY * Math.pow(2, retries), MAX_DELAY);
      console.log(`Request failed. Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries++;
    }
  }

  throw new Error('Max retries reached. Unable to fetch transactions.');
}

function transformExplorerTxToGeneralTx(tx: EtherscanTxItem): GeneralTxItem {
  return {
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    blockNumber: tx.blockNumber,
    methodId: tx.methodId,
    isError: tx.isError,
    input: tx.input,
  };
}

async function getTransactionsFromExplorer(
  api_key: string,
  address: Address,
  action: string,
  from: Address = zeroAddress,
  contractAddresses: (Address | 'any')[],
  methodIds: (string | 'any')[],
  network: Chain['id'],
  startblock: string = '0',
  endblock: string = 'latest',
  filterFunction: TxFilterFunction,
): Promise<GeneralTxItem[]> {
  try {
    const response = await fetchTransactionsFromExplorer(
      network,
      address,
      action,
      contractAddresses,
      startblock,
      endblock,
      api_key,
    );
    if (response.status === '0' && response.message === 'No transactions found') {
      return [];
    }
    if (response.status === '0' || response.message !== 'OK') {
      console.error(`Explorer API error: ${JSON.stringify(response)}`);
      return []; // Return an empty array in case of error
    }
    if (action === 'tokentx') {
      return response.result.map(transformExplorerTxToGeneralTx).filter((tx) => filterFunction(tx, [from], methodIds));
    }
    return response.result
      .map(transformExplorerTxToGeneralTx)
      .filter((tx) => filterFunction(tx, contractAddresses, methodIds));
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return []; // Return an empty array in case of error
  }
}

export async function handleTransactionCheck(config: SignatureCredConfig, check_address: Address): Promise<CredResult> {
  // Handle verification configs array
  const verificationConfigs: VerificationConfig[] = config.verificationConfigs;

  let allTxs: GeneralTxItem[] = [];
  let chain: Chain;
  if (config.network === 7560) {
    chain = cyber;
  } else throw new Error(`Unsupported network: ${config.network}`);
  const publicClient = await createPublicClientForNetwork(chain);
  const isContract = await isContractAddress(publicClient, check_address);
  if (!publicClient) {
    throw new Error('PublicClient is undefined');
  }

  // Process each verification config
  for (const verifyConfig of verificationConfigs) {
    let currentTxs: GeneralTxItem[];

    if (isContract) {
      console.log('Using Jiffyscan API');

      currentTxs = await getJiffyscanTransactions(check_address, config.network);
      // Apply filters
      currentTxs = currentTxs.filter((tx) => {
        const eligibleMethodIds =
          verifyConfig.methodId === 'any'
            ? ['any']
            : Array.isArray(verifyConfig.methodId)
            ? verifyConfig.methodId
            : [verifyConfig.methodId];

        const contractAddresses = Array.isArray(verifyConfig.contractAddress)
          ? verifyConfig.contractAddress
          : [verifyConfig.contractAddress];

        return verifyConfig.filterFunction(tx, contractAddresses, eligibleMethodIds);
      });
    } else {
      const contractAddresses = Array.isArray(verifyConfig.contractAddress)
        ? verifyConfig.contractAddress
        : [verifyConfig.contractAddress];

      const methodIds =
        verifyConfig.methodId === 'any'
          ? ['any']
          : Array.isArray(verifyConfig.methodId)
          ? verifyConfig.methodId
          : [verifyConfig.methodId];

      const action = verifyConfig.type ?? 'txlist';

      if (verifyConfig.from && action == 'txlist') {
        // Check transactions from specified address
        currentTxs = await getTransactions(
          config.apiKeyOrUrl,
          verifyConfig.from,
          action,
          zeroAddress,
          contractAddresses,
          methodIds,
          config.network,
          config.startBlock,
          config.endBlock,
          verifyConfig.filterFunction,
        );
      } else if (verifyConfig.from && action !== 'txlist') {
        currentTxs = await getTransactions(
          config.apiKeyOrUrl,
          check_address,
          action,
          verifyConfig.from,
          contractAddresses,
          methodIds,
          config.network,
          config.startBlock,
          config.endBlock,
          verifyConfig.filterFunction,
        );
      } else {
        // Check transactions from check_address
        currentTxs = await getTransactions(
          config.apiKeyOrUrl,
          check_address,
          action,
          zeroAddress,
          contractAddresses,
          methodIds,
          config.network,
          config.startBlock,
          config.endBlock,
          verifyConfig.filterFunction,
        );
      }
    }
    allTxs = [...allTxs, ...currentTxs];
  }

  return handleTransactionResult(config, allTxs, check_address);
}

function handleTransactionResult(config: SignatureCredConfig, txs: any[], address: Address): CredResult {
  const transactionCount = config.transactionCountCondition(txs, address);
  const mintEligibility = config.mintEligibility(transactionCount);

  if (config.credType === 'ADVANCED') {
    return [mintEligibility, transactionCount.toString()];
  }
  return [mintEligibility, ''];
}
