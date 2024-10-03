import { VerifierManager, CredChainId } from '@phi-hub/sdk';
import { verifySettings, baseSettings } from './verifyConfig';

async function addVerifiers() {
  const credChainId: CredChainId = 84532; // Base Sepolia testnet

  const verifierManager = new VerifierManager(credChainId);

  for (const setting of verifySettings) {
    try {
      console.log(`Adding verifier for credId: ${setting.credId}`);

      const fullSetting = {
        ...baseSettings,
        ...setting,
      };

      const arweaveId = await verifierManager.createVerifier(fullSetting, setting.credId);
      console.log(`Successfully added verifier for credID: ${setting.credId}. Arweave ID: ${arweaveId}`);
    } catch (error) {
      console.error(`Error adding verifier for credId ${setting.credId}:`, error);
    }

    // Sleep for 1 second before next iteration
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

addVerifiers()
  .then(() => console.log('All verifiers added successfully.'))
  .catch((error) => console.error('Error in addVerifiers process:', error));
