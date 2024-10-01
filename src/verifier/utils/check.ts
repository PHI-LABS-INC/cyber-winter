import { credConfig } from '../../cred/credConfig';
import { getTransactions } from './transactionUtils';
import { CredConfig } from '../../utils/types';
import { Address } from 'viem';

type CredResult = [boolean, string];

export async function check_cred(address: string, id: number): Promise<CredResult> {
  const config = credConfig[id];
  if (!config) {
    throw new Error(`Invalid cred id: ${id}`);
  }
  if (config.verificationType != 'SIGNATURE') {
    throw new Error(`Unsupported verification type: ${config.verificationType}`);
  }
  const check_address = address.toLowerCase();

  switch (config.apiChoice) {
    case 'etherscan':
      return handleTransactionCheck(config, check_address as Address);
    default:
      throw new Error(`Invalid API choice: ${config.apiChoice}`);
  }
}

async function handleTransactionCheck(config: CredConfig, check_address: Address): Promise<CredResult> {
  if (config.verificationType != 'SIGNATURE') {
    throw new Error(`Unsupported verification type: ${config.verificationType}`);
  }
  const txs = await getTransactions(
    config.apiKeyOrUrl,
    check_address,
    config.contractAddress,
    config.methodId,
    config.network,
    config.startBlock,
    config.endBlock,
    config.filterFunction,
  );
  return handleTransactionResult(config, txs, check_address);
}

function handleTransactionResult(config: CredConfig, txs: any[], address: string): CredResult {
  if (config.verificationType != 'SIGNATURE') {
    throw new Error(`Unsupported verification type: ${config.verificationType}`);
  }
  if (config.credType === 'ADVANCED') {
    const transactionCount = config.transactionCountCondition(txs, address);
    const mintEligibility = config.mintEligibility(transactionCount);
    return [mintEligibility, transactionCount.toString()];
  }
  return [false, ''];
}
