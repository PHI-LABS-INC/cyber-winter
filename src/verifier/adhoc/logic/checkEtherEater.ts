import { Address } from 'viem';
import { CredResult } from '../../../utils/types';

interface Link3EmailResponse {
  data: {
    getCollectedEmail: string | null;
  };
}

async function checkEtherEater(check_address: Address): Promise<CredResult> {
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
    const response = await fetch('https://api.cyberconnect.dev/link3/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = (await response.json()) as Link3EmailResponse;
    const email = data.data.getCollectedEmail;

    if (email) {
      return [true, ''];
    } else {
      return [false, ''];
    }
  } catch (error) {
    console.error('Error fetching Ether Eater status:', error);
    return [false, ''];
  }
}
