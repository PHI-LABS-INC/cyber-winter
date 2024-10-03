import { CredResult, NeynarCredConfig } from '../../utils/types';

type NeynarResponse = {
  result: {
    user: {
      fid: number;
      username: string;
      displayName: string;
      pfp: {
        url: string;
      };
      profile: {
        bio: {
          text: string;
        };
      };
      followerCount: number;
      followingCount: number;
      verifications: string[];
    };
  };
};

// Type guard function to check if the data matches NeynarResponse structure
function isNeynarResponse(data: unknown): data is NeynarResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'result' in data &&
    typeof (data as any).result === 'object' &&
    'user' in (data as any).result &&
    typeof (data as any).result.user === 'object' &&
    'verifications' in (data as any).result.user &&
    Array.isArray((data as any).result.user.verifications)
  );
}

export async function handleNeynarCheck(config: NeynarCredConfig, address: string): Promise<CredResult> {
  const response = await fetch(`${config.endpoint}?address=${address}`, {
    headers: {
      accept: 'application/json',
      api_key: config.apiKey,
    },
  });

  if (!response.ok) {
    if (response.statusText === 'Not Found') {
      return [false, ''];
    }

    throw new Error(`Neynar API request failed: ${response.statusText}`);
  }

  const data: unknown = await response.json();

  if (!isNeynarResponse(data)) {
    throw new Error('Invalid response format from Neynar API');
  }

  const isVerified = data.result.user.verifications.includes(address.toLowerCase());

  if (config.credType === 'ADVANCED') {
    return [isVerified, isVerified ? 'Verified' : 'Not Verified'];
  } else {
    return [isVerified, ''];
  }
}
