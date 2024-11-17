import { VerifierManager } from '@phi-hub/sdk';
import { verifySettings } from './verifyConfig';

async function addVerifiers() {
  // Define the chain ID for Base Sepolia testnet
  const credChainId: CredChainId = 84532;

  // Initialize the VerifierManager
  const verifierManager = new VerifierManager(credChainId);

  // Iterate through each verify setting
  for (const setting of verifySettings) {
    try {
      console.log(`Adding verifier for credId: ${setting.credId}`);

      // Create verifier using the setting
      const arweaveId = await verifierManager.createVerifier(setting, setting.credId);
      console.log(`Successfully added verifier for credID: ${setting.credId}. Arweave ID: ${arweaveId}`);
    } catch (error) {
      console.error(`Error adding verifier for credId ${setting.credId}:`, error);
    }

    // Sleep for 1 second before the next iteration to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

// Execute the addVerifiers function
addVerifiers()
  .then(() => console.log('All verifiers added successfully.'))
  .catch((error) => console.error('Error in addVerifiers process:', error));
