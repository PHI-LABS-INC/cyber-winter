import dotenv from 'dotenv';
import { Hex, Address } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

dotenv.config();

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

function hexToPrivateKey(hex: string): Hex {
  if (!hex.startsWith('0x')) {
    hex = '0x' + hex;
  }
  return hex as Hex;
}

export const VERIFIER_PRIVATE_KEY = hexToPrivateKey(getEnvVar('VERIFIER_PRIVATE_KEY'));
export const VERIFIER_PRIVATE_KEY2 = hexToPrivateKey(getEnvVar('VERIFIER_PRIVATE_KEY2'));
export const EXECUTOR_PRIVATE_KEY = hexToPrivateKey(getEnvVar('EXECUTOR_PRIVATE_KEY'));
export const executor_account = privateKeyToAccount(EXECUTOR_PRIVATE_KEY);
export const executor: Address = executor_account.address;
// export const verifier_account = privateKeyToAccount(VERIFIER_PRIVATE_KEY);
export const verifier_account = privateKeyToAccount(VERIFIER_PRIVATE_KEY2);
export const verifier: Address = verifier_account.address;

export const ENDPOINT = 'cyber-winter.vercel.app';
