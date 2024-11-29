import { Address } from 'viem';
import { CredResult } from '../../../utils/types';
import { Pool } from 'pg';

interface Participant {
  address: string;
}

interface Commitment {
  id: string;
  participants: Participant[];
}

interface GraphQLResponse {
  data: {
    commitments: Commitment[];
  };
}

export async function checkCommitParticipation(check_address: Address): Promise<CredResult> {
  try {
    const normalizedAddress = check_address.toLowerCase();

    const response = await fetch(
      'https://api.goldsky.com/api/public/project_cm3xfcgzcn8gb01yr1qf8g4jx/subgraphs/commit-subgraph/0.0.1/gn',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            commitments(
              where: {
                id_in: ["6", "7", "8"]
                participants_: { address: "${normalizedAddress}" }
              }
            ) {
              id
            }
          }`,
        }),
      },
    );

    const { data } = (await response.json()) as GraphQLResponse;
    const isParticipant = data.commitments.length > 0;

    return [isParticipant, ''];
  } catch (error) {
    console.error('Error checking Cyber Safari participation:', error);
    return [false, 'Error checking participation status'];
  }
}
