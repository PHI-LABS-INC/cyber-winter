import { Address } from 'viem';
import { CredResult } from '../../../utils/types';

interface Link3GameResponse {
  data: {
    getUserGameScore: number;
  };
}

enum Link3GameType {
  CYBER_JUMP = 'CYBER_JUMP',
  TRICKY_CUP = 'TRICKY_CUP',
}

async function checkLink3GameScore(
  check_address: Address,
  gameType: Link3GameType,
  requiredScore: number,
): Promise<CredResult> {
  const query = {
    query: `
      query GetUserGameScore {
        getUserGameScore(
          address: "${check_address}",
          gameType: ${gameType}
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

    const data = (await response.json()) as Link3GameResponse;
    const score = data.data.getUserGameScore;

    return [score >= requiredScore, score.toString()];
  } catch (error) {
    console.error(`Error fetching ${gameType} score:`, error);
    return [false, '0'];
  }
}

export async function checkDinoJumpAchievement(check_address: Address): Promise<CredResult> {
  const REQUIRED_SCORE = 500;
  return checkLink3GameScore(check_address, Link3GameType.CYBER_JUMP, REQUIRED_SCORE);
}

export async function checkGuessBallAchievement(check_address: Address): Promise<CredResult> {
  const REQUIRED_SCORE = 300;
  return checkLink3GameScore(check_address, Link3GameType.TRICKY_CUP, REQUIRED_SCORE);
}
