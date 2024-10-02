import { credConfig } from '../../cred/credConfig';
import { getTransactions } from './transactionUtils';
import { ContractCallCredConfig, SignatureCredConfig, CredConfig } from '../../utils/types';
import { Address, Chain, createPublicClient, http, PublicClient } from 'viem';
import { base } from 'viem/chains';

type CredResult = [boolean, string];

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
    default:
      throw new Error(`Invalid API choice: ${config}`);
  }
}

async function handleTransactionCheck(config: SignatureCredConfig, check_address: Address): Promise<CredResult> {
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

async function handleContractCall(config: ContractCallCredConfig, check_address: Address): Promise<CredResult> {
  if (config.network !== 8453) {
    throw new Error(`Unsupported network: ${config.network}`);
  }

  const publicClient = await createPublicClientForNetwork(base);
  const contractCallResult = await callContract(publicClient, config, check_address);
  return handleContractCallResult(config, contractCallResult);
}

async function createPublicClientForNetwork(chain: Chain): Promise<PublicClient> {
  const rpc = 'https://rpc.ankr.com/base';

  try {
    const publicClient = createPublicClient({
      chain,
      transport: http(rpc),
    });

    if (!publicClient) {
      throw new Error('PublicClient is undefined');
    }

    return publicClient;
  } catch (error) {
    console.error('Error creating public client:', error);
    throw new Error(`Failed to create publicClient: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function callContract(
  publicClient: PublicClient,
  config: ContractCallCredConfig,
  check_address: Address,
): Promise<unknown> {
  return publicClient.readContract({
    address: config.contractAddress,
    abi: config.abi,
    functionName: config.functionName,
    args: [check_address],
  });
}

function handleContractCallResult(config: ContractCallCredConfig, contractCallResult: unknown): CredResult {
  const mintEligibility = config.contractCallCondition(contractCallResult);
  if (config.credType === 'ADVANCED') {
    return [mintEligibility, contractCallResult?.toString() ?? '0'];
  } else {
    return [mintEligibility, ''];
  }
}
