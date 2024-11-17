import 'dotenv/config';
import { txFilter_Any, txFilter_Contract, txFilter_From, txFilter_Standard } from '../verifier/utils/etherscan/filter';
import { CredConfig, EtherscanTxItem } from '../utils/types';
import { ENDPOINT } from '../config';
import { Address, decodeAbiParameters } from 'viem';

const baseSettings = {
  network: 7560,
  startBlock: '0', // eligible network for your cred
  endBlock: '99999999',
  buyShareRoyalty: 0, // buy share royalty 0%
  sellShareRoyalty: 50, // sell royalty 0.5%
  quantity: 1, // initial share quantity
  verificationSource: 'https://github.com/PHI-LABS-INC/cyber-winter',
};

export const credConfig: { [key: number]: CredConfig } = {
  0: {
    ...baseSettings,
    title: 'Transact on Cyber',
    requirement: 'Execute any transaction on Cyber chain',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    verificationConfigs: [
      {
        contractAddress: 'any',
        methodId: 'any',
        filterFunction: txFilter_Any,
      },
    ],
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Cyber',
    tags: ['Transaction'],
    relatedLinks: ['https://cyber.co/'],
  },
};

export const credVerifyEndpoint: { [key: number]: string } = Object.fromEntries(
  Object.keys(credConfig).map((key) => [key, `https://${ENDPOINT}/api/verify/${key}`]),
);
