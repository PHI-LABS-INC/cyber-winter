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

  const data: NeynarResponse = await response.json();
  const isVerified = data.result.user.verifications.includes(address.toLowerCase());

  if (config.credType === 'ADVANCED') {
    return [isVerified, isVerified ? 'Verified' : 'Not Verified'];
  } else {
    return [isVerified, ''];
  }
}
