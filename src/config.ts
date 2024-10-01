import { ArtManager, CredManager } from '@phi-hub/sdk';
import dotenv from 'dotenv';
import { Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
dotenv.config();

export const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
export const EXECUTOR_PRIVATE_KEY = process.env.EXECUTOR_PRIVATE_KEY;

export const signer_account = privateKeyToAccount(SIGNER_PRIVATE_KEY as Hex);
export const signer = signer_account.address;

export const executor = privateKeyToAccount(EXECUTOR_PRIVATE_KEY as Hex).address;
