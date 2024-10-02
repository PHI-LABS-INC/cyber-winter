import { Address, Chain, createPublicClient, http, PublicClient } from 'viem';
import { base } from 'viem/chains';
import { ContractCallCredConfig, CredResult } from '../../utils/types';

export async function handleContractCall(config: ContractCallCredConfig, check_address: Address): Promise<CredResult> {
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
