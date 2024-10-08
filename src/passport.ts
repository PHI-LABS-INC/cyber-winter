import { Hex } from 'viem';
import { createCredRequest } from './cred/createCredRequest';
import { createArtRequest } from './art/createArtRequest';
import { ArtManager, CredManager, CredChainId, ArtChainId, fetchIsArtMinted } from '@phi-hub/sdk';
import { ENDPOINT, executor, EXECUTOR_PRIVATE_KEY, verifier } from './config';
import fs from 'fs';
import path from 'path';

interface ProcessResult {
  configId: number;
  credId: number;
  artId?: number;
}

const OUTPUT_FILE = path.join(__dirname, 'output', 'cred_art_results.json');

// New configuration JSON
const customConfig = {
  cred: {
    title: 'PHI Achievement',
    description: 'Perform a specific action on the blockchain',
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
    title: 'Phi Achievement Art',
    description: 'Dynamic art representing phi achievement',
    project: 'PHI',
    tags: ['PHI', 'Custom'],
    externalURL: 'https://example.com',
    price: 0,
    maxSupply: undefined, // undefined means no limit
    soulbound: true,
    startDate: Math.floor(Date.now() / 1000),
    endDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // One year from now
    artType: 'API_ENDPOINT' as const,
    endpoint: `https:/${ENDPOINT}/api/image/passport`,
    previewInput: { address: executor, data: '0' },
    artist: executor,
    receiver: executor,
    executor: executor,
  },
};

function loadExistingResults(): ProcessResult[] {
  if (fs.existsSync(OUTPUT_FILE)) {
    const data = fs.readFileSync(OUTPUT_FILE, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

async function main() {
  const privateKey = EXECUTOR_PRIVATE_KEY as Hex;
  console.log(`Processing executor: ${executor}`);

  const credChainId: CredChainId = 84532;
  const artChainId: ArtChainId = 84532;

  const credManager = new CredManager(privateKey, credChainId);
  const artManager = new ArtManager(privateKey, artChainId);

  const configId = 1; // Custom config ID

  try {
    console.log(`Processing custom cred config: ${configId}`);

    const config = customConfig.cred;

    let credCreator = executor;
    let credRequest = await createCredRequest(
      configId,
      executor,
      credCreator,
      credChainId,
      verifier,
      'https:/${ENDPOINT}/api/verify/passort',
    );

    const credId = await credManager.createCred(credRequest, credChainId);
    console.log(`Successfully processed configId: ${configId} with credID: ${credId}`);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Processing custom art config: ${configId}`);

    const artSetting = customConfig.art;

    const artRequest = await createArtRequest({
      ...artSetting,
      network: artChainId,
      previewInput: { address: executor, data: '0' },
    });

    const artId = await artManager.createArt(artRequest, credId, credChainId);
    console.log(`Successfully processed createArt for credID: ${credId} with artID: ${artId}`);
    console.log(
      `Art details: Title - ${artSetting.title}, Project - ${artSetting.project}, Tags - ${artSetting.tags.join(', ')}`,
    );
  } catch (error) {
    console.error(`Error processing configId ${configId}:`, error);
  }
}

main()
  .then(() => console.log('All processing completed.'))
  .catch((error) => console.error('Error in main process:', error));
