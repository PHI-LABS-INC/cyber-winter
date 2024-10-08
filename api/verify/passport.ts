import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Address } from 'viem';
import fs from 'fs/promises';
import path from 'path';
import { fetchIsArtMinted, ArtChainId } from '@phi-hub/sdk';
import { create_signature } from '../../src/verifier/utils/signature';

interface CredArtResult {
  configId: number;
  credId: number;
  artId: number;
}

async function checkIsArtMintedNumber(address: Address): Promise<[boolean, string]> {
  try {
    // Read the JSON file
    const jsonPath = path.join(process.cwd(), 'public/assets/output', 'cred_art_results.json');
    const jsonData = await fs.readFile(jsonPath, 'utf-8');
    const credArtResults: CredArtResult[] = JSON.parse(jsonData);

    // Define the chain ID (adjust as necessary)
    const chainId: ArtChainId = 8453; // Base Sepolia testnet

    let mintedCount = 0;
    const mintedArtIds: number[] = [];

    // Check minting status for each art ID
    for (const result of credArtResults) {
      const isMinted = await fetchIsArtMinted({
        chainId,
        artId: BigInt(result.artId),
        address,
      });
      if (isMinted) {
        mintedCount++;
      }
    }

    return [true, mintedCount.toString()];
  } catch (error) {
    console.error('Error in checkIsArtMintedNumber:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ error: 'Address is required and must be a string' });
  }

  try {
    const [mint_eligibility, data] = await checkIsArtMintedNumber(address as Address);

    console.log(`Cred check result for address:${address}, mint_eligibility: ${mint_eligibility}`);

    const signature = await create_signature(address as Address, mint_eligibility, data);
    console.log(`Signature created ${signature}`);

    return res.status(200).json({ mint_eligibility, signature, data });
  } catch (error) {
    console.error('Error in verify:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
