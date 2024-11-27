import { Address, Chain, createPublicClient, http, PublicClient } from 'viem';
import { cyber } from 'viem/chains';
import { CredResult } from '../../../utils/types';

const PHI_CONTRACT_ADDRESS = '0x9baBBbE884fe75244f277F90d4bB696434fA1920' as const;
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

const CYBER_RPC = process.env.CYBER_RPC;
async function createPublicClientForNetwork(chain: Chain): Promise<PublicClient> {
  try {
    const publicClient = createPublicClient({
      chain,
      transport: http(CYBER_RPC),
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

    // Check credentials from 2 to 9
    for (let credId = 2; credId <= 9; credId++) {
      const isMinted = await publicClient.readContract({
        address: PHI_CONTRACT_ADDRESS,
        abi: PHI_CONTRACT_ABI,
        functionName: 'isCredMinted',
        args: [chainId, BigInt(credId), check_address],
      });

      if (!isMinted) {
        return [false, `Credential ${credId} not minted`];
      }
    }

    // If we get here, all credentials are minted
    return [true, ''];
  } catch (error) {
    console.error('Error checking PHI NFT credentials:', error);
    return [false, 'Error checking credential status'];
  }
}

// Optional: Function to check specific credential
export async function checkSinglePhiCredential(check_address: Address, credId: number): Promise<CredResult> {
  try {
    const publicClient = await createPublicClientForNetwork(cyber);
    const chainId = 7560n;

    const isMinted = await publicClient.readContract({
      address: PHI_CONTRACT_ADDRESS,
      abi: PHI_CONTRACT_ABI,
      functionName: 'isCredMinted',
      args: [chainId, BigInt(credId), check_address],
    });

    return [isMinted, ''];
  } catch (error) {
    console.error(`Error checking PHI credential ${credId}:`, error);
    return [false, 'Error checking credential status'];
  }
}
