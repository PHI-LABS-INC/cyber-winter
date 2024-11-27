import { Address, Chain, createPublicClient, http, PublicClient } from 'viem';
import { cyber } from 'viem/chains';
import { ERC1155_ABI, ERC721_ABI, NFTCollection } from '../types';
import { CredResult } from '../../../utils/types';

export const CYBER_NFT_COLLECTIONS: NFTCollection[] = [
  {
    name: 'Cyber Mascot',
    address: '0x60a1b9c6900c6cef0e08b939cc00635ad7df02a1',
    standard: 'ERC1155',
    tokenId: 2,
  },
  {
    name: 'CZ',
    address: '0x60a1b9c6900c6cef0e08b939cc00635ad7df02a1',
    standard: 'ERC1155',
    tokenId: 1,
  },
  {
    name: 'Cyber Chiblings',
    address: '0x03f3d8ba574B89af2A9c2199E4312837e1151750',
    standard: 'ERC721',
  },
  {
    name: 'CyberID',
    address: '0xc137be6b59e824672aada673e55cf4d150669af8',
    standard: 'ERC721',
  },
  // {
  //   name: 'Social Summer',
  //   address: '0x2d9181b954736971bb74043d4782dfe93b55a9af',
  //   standard: 'ERC1155',
  // },
  {
    name: 'Link3 EGG',
    address: '0x28cd7b0e0e927a8b627e96a0ba598d7101d87b2d',
    standard: 'ERC721',
  },
  {
    name: 'New Era',
    address: '0x4d5a1bf279aa7371e230df48a89fab822e4ad30e',
    standard: 'ERC1155',
  },
] as const;

async function createPublicClientForNetwork(chain: Chain): Promise<PublicClient> {
  const rpc = 'https://rpc.cyber.co';

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

async function checkERC721Balance(
  publicClient: PublicClient,
  contractAddress: Address,
  walletAddress: Address,
): Promise<boolean> {
  try {
    const balance = await publicClient.readContract({
      address: contractAddress,
      abi: ERC721_ABI,
      functionName: 'balanceOf',
      args: [walletAddress],
    });

    return BigInt(balance) > 0n;
  } catch (error) {
    console.error(`Error checking ERC721 balance for ${contractAddress}:`, error);
    return false;
  }
}

async function checkERC1155Balance(
  publicClient: PublicClient,
  contractAddress: Address,
  walletAddress: Address,
  tokenId: number,
): Promise<boolean> {
  try {
    const balance = await publicClient.readContract({
      address: contractAddress,
      abi: ERC1155_ABI,
      functionName: 'balanceOf',
      args: [walletAddress, BigInt(tokenId)],
    });

    return BigInt(balance) > 0n;
  } catch (error) {
    console.error(`Error checking ERC1155 balance for ${contractAddress} token ${tokenId}:`, error);
    return false;
  }
}

export async function checkCyberNFTs(check_address: Address): Promise<CredResult> {
  const publicClient = await createPublicClientForNetwork(cyber);

  for (const collection of CYBER_NFT_COLLECTIONS) {
    let hasNFT = false;

    if (collection.standard === 'ERC721') {
      hasNFT = await checkERC721Balance(publicClient, collection.address, check_address);
    } else if (collection.standard === 'ERC1155' && collection.tokenId !== undefined) {
      hasNFT = await checkERC1155Balance(publicClient, collection.address, check_address, collection.tokenId);
    }

    if (hasNFT) {
      return [true, ''];
    }
  }

  return [false, ''];
}
