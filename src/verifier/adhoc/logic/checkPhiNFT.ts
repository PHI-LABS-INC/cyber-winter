import { Address, Chain, createPublicClient, http, PublicClient, encodeFunctionData } from 'viem';
import { cyber } from 'viem/chains';
import { CredResult } from '../../../utils/types';

const PHI_CONTRACT_ADDRESS = '0x9baBBbE884fe75244f277F90d4bB696434fA1920' as const;
const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11' as const;

const PHI_CONTRACT_ABI = [
  {
    type: 'function',
    inputs: [
      { name: 'credChainId', internalType: 'uint256', type: 'uint256' },
      { name: 'credId', internalType: 'uint256', type: 'uint256' },
      { name: 'minter', internalType: 'address', type: 'address' },
    ],
    name: 'isCredMinted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const;

const MULTICALL3_ABI = [
  {
    inputs: [
      {
        components: [
          { name: 'target', type: 'address' },
          { name: 'allowFailure', type: 'bool' },
          { name: 'callData', type: 'bytes' },
        ],
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        components: [
          { name: 'success', type: 'bool' },
          { name: 'returnData', type: 'bytes' },
        ],
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

async function createPublicClientForNetwork(chain: Chain): Promise<PublicClient> {
  try {
    const publicClient = createPublicClient({
      chain,
      transport: http('https://rpc.cyber.co'),
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

export async function checkPhiNFTCredentials(check_address: Address): Promise<CredResult> {
  try {
    const publicClient = await createPublicClientForNetwork(cyber);
    const chainId = 7560n;

    // Prepare multicall calls for credentials 2-9
    const calls = Array.from({ length: 8 }, (_, i) => {
      const credId = i + 2; // credentials from 2 to 9
      const callData = encodeFunctionData({
        abi: PHI_CONTRACT_ABI,
        functionName: 'isCredMinted',
        args: [chainId, BigInt(credId), check_address],
      });

      return {
        target: PHI_CONTRACT_ADDRESS,
        allowFailure: false,
        callData,
      };
    });

    // Execute multicall
    const results = await publicClient.readContract({
      address: MULTICALL3_ADDRESS,
      abi: MULTICALL3_ABI,
      functionName: 'aggregate3',
      args: [calls],
    });

    // Check if all credentials are minted
    const allMinted = results.every((result) => {
      if (!result.success) return false;
      // Decode the boolean result from the returnData
      return result.returnData === '0x0000000000000000000000000000000000000000000000000000000000000001';
    });

    if (!allMinted) {
      return [false, ''];
    }

    return [true, ''];
  } catch (error) {
    console.error('Error checking PHI NFT credentials:', error);
    return [false, 'Error checking credential status'];
  }
}

// Optional: Check multiple specific credentials in one call
export async function checkMultiplePhiCredentials(check_address: Address, credIds: number[]): Promise<CredResult> {
  try {
    const publicClient = await createPublicClientForNetwork(cyber);
    const chainId = 7560n;

    const calls = credIds.map((credId) => ({
      target: PHI_CONTRACT_ADDRESS,
      allowFailure: false,
      callData: encodeFunctionData({
        abi: PHI_CONTRACT_ABI,
        functionName: 'isCredMinted',
        args: [chainId, BigInt(credId), check_address],
      }),
    }));

    const results = await publicClient.readContract({
      address: MULTICALL3_ADDRESS,
      abi: MULTICALL3_ABI,
      functionName: 'aggregate3',
      args: [calls],
    });

    const allMinted = results.every((result) => {
      if (!result.success) return false;
      return result.returnData === '0x0000000000000000000000000000000000000000000000000000000000000001';
    });

    return [allMinted, ''];
  } catch (error) {
    console.error('Error checking PHI credentials:', error);
    return [false, 'Error checking credential status'];
  }
}
