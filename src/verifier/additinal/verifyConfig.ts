import { Address } from 'viem';

// EXAMPLES
export const baseSettings = {
  address: '0x1234567890123456789012345678901234567890' as Address,
  verificationSource: 'https://github.com/example/verify-source',
};

export interface VerifySetting {
  credId: number;
  endpoint: string;
  address?: Address;
  verificationSource?: string;
}

export const verifySettings: VerifySetting[] = [
  {
    credId: 30,
    endpoint: 'https://example.com/api/verify/30',
  },
  {
    credId: 31,
    endpoint: 'https://example.com/api/verify/31',
  },
];
