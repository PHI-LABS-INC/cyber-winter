import { Hex } from 'viem';
import { ArtManager } from '@phi-hub/sdk';
import { artSettings } from '../artConfig';
import fs from 'fs';
import path from 'path';
import { readFileAsBase64 } from '../../utils/readFiles';
import { executor, EXECUTOR_PRIVATE_KEY } from '../../config';

// const artChainId = 80084; // PHI Testnet
const artChainId = 7560; // PHI Mainnet
const OUTPUT_FILE = path.join(process.cwd(), 'public/assets/output', `cred_art_results_${artChainId}.json`);

function loadExistingResults(): any[] {
  if (fs.existsSync(OUTPUT_FILE)) {
    const data = fs.readFileSync(OUTPUT_FILE, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

async function updateArtScript() {
  const privateKey = EXECUTOR_PRIVATE_KEY as Hex;

  const artManager = new ArtManager(privateKey, artChainId);

  let results = loadExistingResults();

  for (let configId = 12; configId <= 31; configId++) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log(`Processing art config: ${configId}`);

      const artSetting = artSettings[configId];
      if (!artSetting || artSetting.artType != 'IMAGE') {
        console.log(`No art setting found for configId ${configId}, skipping.`);
        continue;
      }

      // Assuming we have the artId stored somewhere or we can retrieve it
      // For this example, let's assume it's stored in the results
      const existingResult = results.find((r) => r.configId === configId);
      if (!existingResult || !existingResult.artId) {
        console.log(`No existing artId found for configId ${configId}, skipping.`);
        continue;
      }

      const artId = BigInt(existingResult.artId);
      const imageData = await readFileAsBase64(artSetting.imagePath);
      const updateInput = {
        name: artSetting.name,
        description: artSetting.description,
        imageData,
        tags: artSetting.tags,
        executor: executor,
        receiver: artSetting.receiver as `0x${string}`,
        maxSupply: artSetting.maxSupply || BigInt(1000),
        price: artSetting.price,
        start: artSetting.startDate,
        end: artSetting.endDate,
        royaltyBPS: 500, // Assuming a default 5% royalty, adjust as needed
        royaltyRecipient: artSetting.receiver as `0x${string}`, // Using receiver as royalty recipient
      };

      console.log(`Updating art for configId: ${configId}, artId: ${artId}`);
      const updatedArtId = await artManager.updateArt(artId, updateInput);
      console.log(`Successfully updated art for configId: ${configId}, artId: ${updatedArtId}`);
    } catch (error) {
      console.error(`Error updating art for configId ${configId}:`, error);
      // Optionally break here if you want to stop on first error
      // break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

updateArtScript()
  .then(() => console.log('All art updates completed.'))
  .catch((error) => console.error('Error in main update process:', error));
