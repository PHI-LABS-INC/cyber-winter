import { Hex } from 'viem';
import { createArtRequest } from './art/createArtRequest';
import { ArtManager, CredManager, SignatureCredRequest, BaseCredRequest, ArtCreateInput } from '@phi-hub/sdk';
import { ENDPOINT, executor, EXECUTOR_PRIVATE_KEY, verifier } from './config';
import { readImageAsBase64 } from './utils/readFiles';

// New configuration JSON
const customConfig = {
  cred: {
    title: 'PHI Achievement',
    requirement: 'Perform a specific action on the blockchain',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'phi',
    apiKeyOrUrl: process.env.ETHERSCAN_API_KEY ?? '',
    contractAddress: 'any',
    methodId: 'any',
    project: 'PHI',
    tags: ['DeFi', 'Custom'],
    relatedLinks: ['https://phi.box'],
  },
  art: {
    name: 'Phi Achievement Art',
    description: 'Dynamic art representing phi achievement',
    project: 'PHI',
    tags: ['PHI', 'Custom'],
    externalURL: 'https://example.com',
    price: 0,
    maxSupply: undefined, // undefined means no limit
    soulbound: true,
    startDate: Math.floor(Date.now() / 1000),
    endDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // One year from now
    artist: executor,
    receiver: executor,
    executor: executor,
    network: 84532,
  },
};

async function main() {
  const privateKey = EXECUTOR_PRIVATE_KEY as Hex;
  console.log(`Processing executor: ${executor}`);

  const credChainId = 84532;
  const artChainId = 84532;

  const credManager = new CredManager(privateKey, credChainId);
  const artManager = new ArtManager(privateKey, artChainId);
  const base64Image = await readImageAsBase64(19); //phi
  try {
    let credCreator = executor;
    let request: SignatureCredRequest;
    const baseRequest: BaseCredRequest = {
      executor: executor,
      creator: credCreator,
      credType: 'ADVANCED',
      requirement: customConfig.cred.requirement,
      imageData: base64Image,
      verificationSource: 'https://phi.box',
      title: customConfig.cred.title,
      networks: [84532],
      project: customConfig.cred.project,
      tags: customConfig.cred.tags,
      relatedLinks: customConfig.cred.relatedLinks,
      quantity: BigInt(1),
      buyShareRoyalty: 100,
      sellShareRoyalty: 100,
    };

    let credRequest = (request = {
      ...baseRequest,
      verificationType: 'SIGNATURE',
      verifier: {
        address: verifier,
        endpoint: `https:/${ENDPOINT}/api/verify/passport`,
      },
    } as SignatureCredRequest);
    const credId = await credManager.createCred(credRequest, credChainId);
    console.log(`Successfully processed`);

    const artSetting = customConfig.art;

    const artRequest: ArtCreateInput = await createArtRequest({
      ...artSetting,
      endpoint: `https:/${ENDPOINT}/api/image/passport`,
      previewInput: { address: executor, data: '0' },
    });

    const artId = await artManager.createArt(artRequest, credId, credChainId);
    console.log(`Successfully processed createArt for credID: ${credId} with artID: ${artId}`);
    console.log(
      `Art details: Title - ${artSetting.name}, Project - ${artSetting.project}, Tags - ${artSetting.tags.join(', ')}`,
    );
  } catch (error) {
    console.error(`Error processing configId`, error);
  }
}

main()
  .then(() => console.log('All processing completed.'))
  .catch((error) => console.error('Error in main process:', error));
