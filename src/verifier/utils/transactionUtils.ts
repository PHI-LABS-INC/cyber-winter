import axios from 'axios';
import {
  EtherscanResponse,
  GeneralTxItem,
  EtherscanTxItem,
  TxFilterFunction,
  SignatureCredConfig,
  CredResult,
} from '../../utils/types';
import { Address, Chain } from 'viem';

export async function getTransactions(
  api_key: string,
  address: Address,
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
    contractAddresses,
    methodIds,
    network,
    startblock,
    endblock,
    txFilter,
  );
}

async function fetchTransactionsFromExplorer(
  network: Chain['id'],
  address: string,
  startblock: string,
  endblock: string,
  api_key: string,
): Promise<EtherscanResponse> {
  let apiBaseURL;
  if (network === 8453) {
    apiBaseURL = 'https://api.basescan.org';
  } else if (network === 84532) {
    apiBaseURL = 'https://api-sepolia.basescan.org';
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }

  const url = `${apiBaseURL}/api?module=account&action=txlist&address=${address}&startblock=${startblock}&endblock=${endblock}&sort=desc&apikey=${api_key}`;

  try {
    const response = await axios.get<EtherscanResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
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
  contractAddresses: (Address | 'any')[],
  methodIds: (string | 'any')[],
  network: Chain['id'],
  startblock: string = '0',
  endblock: string = 'latest',
  filterFunction: TxFilterFunction,
): Promise<GeneralTxItem[]> {
  const response = await fetchTransactionsFromExplorer(network, address, startblock, endblock, api_key);
  if (response.status === '0' && response.message === 'No transactions found') {
    return [];
  }
  if (response.message !== 'OK') {
    const msg = `Explorer API error: ${JSON.stringify(response)}`;
    throw new Error(`Explorer API failed: ${msg}`);
  }

  return response.result
    .map(transformExplorerTxToGeneralTx)
    .filter((tx) => filterFunction(tx, contractAddresses, methodIds));
}

export async function handleTransactionCheck(config: SignatureCredConfig, check_address: Address): Promise<CredResult> {
  const contractAddresses = Array.isArray(config.contractAddress) ? config.contractAddress : [config.contractAddress];
  const methodIds =
    config.methodId === 'any' ? ['any'] : Array.isArray(config.methodId) ? config.methodId : [config.methodId];

  const txs = await getTransactions(
    config.apiKeyOrUrl,
    check_address,
    contractAddresses,
    methodIds,
    config.network,
    config.startBlock,
    config.endBlock,
    config.filterFunction,
  );
  return handleTransactionResult(config, txs, check_address);
}

function handleTransactionResult(config: SignatureCredConfig, txs: any[], address: Address): CredResult {
  const transactionCount = config.transactionCountCondition(txs, address);
  const mintEligibility = config.mintEligibility(transactionCount);

  if (config.credType === 'ADVANCED') {
    return [mintEligibility, transactionCount.toString()];
  }
  return [mintEligibility, ''];
}
