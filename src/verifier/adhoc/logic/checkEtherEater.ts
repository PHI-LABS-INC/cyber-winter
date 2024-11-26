import { Address } from 'viem';
import { CredResult } from '../../../utils/types';

interface Link3EmailResponse {
  data: {
    getCollectedEmail: string[] | string | null;
  };
}

export async function checkEtherEater(check_address: Address): Promise<CredResult> {
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
        Accept: 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return [false, ''];
    }

    const data = (await response.json()) as Link3EmailResponse;

    if (!data || !('data' in data) || !('getCollectedEmail' in data.data)) {
      console.error('Invalid response structure:', data);
      return [false, ''];
    }

    const email = data.data.getCollectedEmail;

    if (Array.isArray(email)) {
      return email.length > 0 ? [true, ''] : [false, ''];
    }

    return email ? [true, ''] : [false, ''];
  } catch (error) {
    console.error('Error in checkEtherEater:', error);
    return [false, ''];
  }
}

export default checkEtherEater;
