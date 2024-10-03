import { Hex } from 'viem';
import { createCredRequest } from './cred/createCredRequest';
import { createArtRequest } from './art/createArtRequest';
import { ArtManager, CredManager, CredChainId, ArtChainId } from '@phi-hub/sdk';
import { credConfig, credVerifyEndpoint } from './cred/credConfig';
import { executor, EXECUTOR_PRIVATE_KEY, verifier, VERIFIER_PRIVATE_KEY } from './config';
import { artSettings } from './art/artConfig';

// this script is an example of how to create cred and art using phi-sdk
async function main() {
  const privateKey = EXECUTOR_PRIVATE_KEY as Hex;
  console.log(`Processing executor: ${executor}`);

  // please check these chainIds are supported by phi.
  const credChainId: CredChainId = 84532;
  const artChainId: ArtChainId = 84532;

  const credManager = new CredManager(privateKey, credChainId);
  const artManager = new ArtManager(privateKey, artChainId);

  // please change number of configs based on your requirement
  for (let configId = 30; configId <= 30; configId++) {
    try {
      console.log(`Processing cred config: ${configId}`);

      const config = credConfig[configId];
      if (!config) {
        console.log(`No config found for configId: ${configId}, skipping.`);
        continue;
      }

      let credCreator = executor; // default to executor
      // Create Cred
      let credRequest = await createCredRequest(
        configId,
        executor,
        credCreator,
        config.network, // eligible network for your cred
        config.verificationType === 'SIGNATURE' ? verifier : undefined,
        config.verificationType === 'SIGNATURE' ? credVerifyEndpoint[configId] : undefined,
      );

      const credId = await credManager.createCred(credRequest, credChainId);
      console.log(`Successfully processed configId: ${configId} with credID: ${credId}`);

      // Sleep for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(`Processing art config: ${configId}`);
      const artSetting = artSettings[configId];
      if (!artSetting) {
        console.log(`No art setting found for configId ${configId}, skipping art creation.`);
        continue;
      }

      let artRequest;
      const baseArtRequest = {
        title: artSetting.title,
        description: artSetting.description,
        externalURL: artSetting.externalURL,
        network: artChainId,
        executor,
        artist: artSetting.artist,
        receiver: artSetting.receiver,
        price: artSetting.price,
        maxSupply: artSetting.maxSupply,
        startDate: artSetting.startDate,
        endDate: artSetting.endDate,
        soulbound: artSetting.soulbound,
      };

      if (artSetting.artType === 'API_ENDPOINT') {
        artRequest = await createArtRequest({
          ...baseArtRequest,
          endpoint: artSetting.endpoint,
          previewInput: artSetting.previewInput,
        });
      } else if (artSetting.artType === 'IMAGE') {
        artRequest = await createArtRequest({
          ...baseArtRequest,
          imagePath: artSetting.imagePath,
        });
      } else {
        throw new Error(`Unsupported artType`);
      }

      const artId = await artManager.createArt(artRequest, credId, credChainId);
      console.log(`Successfully processed createArt for credID: ${credId} with artID: ${artId}`);
      console.log(
        `Art details: Title - ${artSetting.title}, Project - ${artSetting.project}, Tags - ${artSetting.tags.join(
          ', ',
        )}`,
      );
    } catch (error) {
      console.error(`Error processing configId ${configId}:`, error);
      break;
    }

    // Sleep for 1 second before next iteration
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

main()
  .then(() => console.log('All processing completed.'))
  .catch((error) => console.error('Error in main process:', error));
