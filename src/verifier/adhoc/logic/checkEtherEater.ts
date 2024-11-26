import { Address } from 'viem';
import { CredResult } from '../../../utils/types';

interface Link3EmailResponse {
  data: {
    getCollectedEmail: string | null;
  };
}

export async function checkEtherEater(check_address: Address): Promise<CredResult> {
  // GraphQL query with proper formatting
  const query = {
    query: `
      query GetCollectEmails {
        getCollectedEmail(
          handle: "ethereater",
          address: "${check_address}"
        )
      }
    `,
  };

  try {
    // Make POST request to the API
    const response = await fetch('https://api.cyberconnect.dev/link3/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(query),
    });

    // Check if response is ok
    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return [false, `API request failed: ${response.statusText}`];
    }

    // Parse response data
    const data = (await response.json()) as Link3EmailResponse;

    // Validate response structure
    if (!data || !('data' in data) || !('getCollectedEmail' in data.data)) {
      console.error('Invalid response structure:', data);
      return [false, 'Invalid response structure'];
    }

    const email = data.data.getCollectedEmail;

    // Return result based on email presence
    return email ? [true, ''] : [false, ''];
  } catch (error) {
    // Enhanced error logging
    console.error('Error in checkEtherEater:', error);
    return [false, error instanceof Error ? error.message : 'Unknown error occurred'];
  }
}

export default checkEtherEater;
