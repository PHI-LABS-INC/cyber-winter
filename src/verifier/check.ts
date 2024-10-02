import { credConfig } from '../cred/credConfig';
import { handleTransactionCheck } from './utils/transactionUtils';
import { ContractCallCredConfig, SignatureCredConfig, CredResult, NeynarCredConfig } from '../utils/types';
import { Address } from 'viem';
import { handleContractCall } from './utils/contractCall';
import { handleNeynarCheck } from './utils/naynar';

export async function check_cred(address: string, id: number): Promise<CredResult> {
  const config = credConfig[id];
  if (!config) {
    throw new Error(`Invalid cred id: ${id}`);
  }
  if (config.verificationType !== 'SIGNATURE') {
    throw new Error(`Unsupported verification type: ${config.verificationType}`);
  }
  const check_address = address.toLowerCase() as Address;

  switch (config.apiChoice) {
    case 'etherscan':
      return handleTransactionCheck(config as SignatureCredConfig, check_address);
    case 'contractCall':
      return handleContractCall(config as ContractCallCredConfig, check_address);
    case 'neynar':
      return handleNeynarCheck(config as NeynarCredConfig, address);
    default:
      throw new Error(`Invalid API choice: ${config}`);
  }
}
