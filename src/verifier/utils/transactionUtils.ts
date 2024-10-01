import axios from 'axios';
import { EtherscanResponse, GeneralTxItem, EtherscanTxItem, TxFilterFunction } from '../../utils/types';
import { Address, Chain } from 'viem';

export async function getTransactions(
  api_key: string,
  address: Address,
  contractAddress: Address | 'any',
  methodId: string,
  network: Chain['id'],
  startblock: string,
  endblock: string,
  txFilter: TxFilterFunction,
): Promise<GeneralTxItem[]> {
  return getTransactionsFromExplorer(
    api_key,
    address,
    contractAddress,
    methodId,
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
  contractAddress: Address | 'any',
  methodId: string,
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
    .filter((tx) => filterFunction(tx, contractAddress, methodId));
}
