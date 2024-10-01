import 'dotenv/config';
import { txFilter_Any, txFilter_Contract, txFilter_Standard } from '../verifier/utils/filter';
import { CredConfig } from '../utils/types';
import { ENDPOINT } from '../config';

const baseSettings = {
  network: 8453,
  startBlock: '0', // eligible network for your cred
  endBlock: 'latest',
  buyShareRoyalty: 100, // buy share royalty 1%
  sellShareRoyalty: 100, // sell royalty 1%
  quantity: 1, // initial share quantity
  verificationSource: 'https://github.com/PHI-LABS-INC/base-autumn',
};

export const credConfig: { [key: number]: CredConfig } = {
  0: {
    ...baseSettings,
    title: 'Number of transactions on Basechain',
    description: '[PHI-Season-0] Execute any transaction on Basechain',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: 'any',
    methodId: 'any',
    filterFunction: txFilter_Any,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Base',
    tags: ['Transaction'],
    relatedLinks: ['https://base.org/'],
  },
  1: {
    ...baseSettings,
    title: 'Mint a brush to save your art on the canvas',
    description: 'Mint a Brush on Base Paint',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xD68fe5b53e7E1AbeB5A4d0A6660667791f39263a',
    methodId: 'any',
    filterFunction: txFilter_Any,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Base Paint',
    tags: ['Transaction', 'Base', 'Art'],
    relatedLinks: [
      'https://basepaint.xyz/brush',
      'https://basescan.org/address/0xD68fe5b53e7E1AbeB5A4d0A6660667791f39263a',
    ],
  },
  2: {
    ...baseSettings,
    title: '[Base] Trade Options on Stryke',
    description: 'Purchase Option on the Stryke platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x8C4D42ACdAf0dea678B02A092276E2313eD7D820',
    methodId: '0xac9650d8',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Stryke',
    tags: ['DeFi', 'Option'],
    relatedLinks: ['https://www.stryke.xyz/en/dashboard'],
    verificationSource: 'https://github.com/PHI-LABS-INC/base-autumn',
  },
  3: {
    ...baseSettings,
    title: 'More than 5 transactions with Fren pet',
    description: 'Interact with Fren pet more than 5 times',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x0e22B5f3E11944578b37ED04F5312Dfc246f443C',
    methodId: 'any',
    filterFunction: txFilter_Contract,
    mintEligibility: (result: number) => result > 5,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Frenpet',
    tags: ['Gaming', 'Pet'],
    relatedLinks: ['https://frenpet.xyz/', 'https://basescan.org/address/0x0e22B5f3E11944578b37ED04F5312Dfc246f443C'],
  },
  4: {
    ...baseSettings,
    title: 'Deposit USDC in PoolTogether (Base)',
    description: 'Deposit USDC into PoolTogether on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x7f5C2b379b88499aC2B997Db583f8079503f25b9',
    functionName: 'balanceOf',
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
        ],
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
      },
    ],
    contractCallCondition: (result: number) => result > 0,
    project: 'PoolTogether',
    tags: ['DeFi', 'Savings'],
    relatedLinks: ['https://app.cabana.fi/vault/8453/0x7f5C2b379b88499aC2B997Db583f8079503f25b9'],
  },
  5: {
    ...baseSettings,
    title: 'Create on chain Activity on DOT',
    description: 'Perform an on-chain activity on DOT platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x7b5673B598A71d27a56781271eC5fa05DE216df0',
    methodId: '0x72c275a4',
    filterFunction: txFilter_Contract,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'DOT',
    tags: ['Social'],
    relatedLinks: ['https://dot.fan/'],
  },
  6: {
    ...baseSettings,
    title: 'Holder of a Vrbs',
    description: 'Own at least one Vrbs token',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x9ea7fd1B8823a271BEC99b205B6c0C56d7C3eAe9',
    functionName: 'balanceOf',
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [
          {
            name: 'account',
            type: 'address',
          },
        ],
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
      },
    ],
    contractCallCondition: (result: number) => result > 0,
    project: 'Vrbs',
    tags: ['NFT'],
    relatedLinks: [
      'https://vrbs.build/vrbs/auction',
      'https://basescan.org/address/0x9ea7fd1b8823a271bec99b205b6c0c56d7c3eae9',
    ],
  },
};

export const credVerifyEndpoint: { [key: number]: string } = Object.fromEntries(
  Object.keys(credConfig).map((key) => [key, `https://${ENDPOINT}/api/verify/${key}`]),
);
