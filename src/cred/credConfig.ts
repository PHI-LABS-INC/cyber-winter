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
  1: {
    ...baseSettings,
    title: 'Cyber NFT Family',
    requirement:
      'Own at least one Cyber NFT (Cyber Mascot, CZ, Cyber Chiblings, CyberID, Social Summer, Link3 EGG, or New Era)',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'adhoc',
    id: 1,
    project: 'Cyber',
    tags: ['NFT', 'Cyber', 'CyberConnect'],
    relatedLinks: [
      'https://element.market/assets/cyber/0x60a1b9c6900c6cef0e08b939cc00635ad7df02a1/2', // Cyber Mascot
      'https://element.market/assets/cyber/0x60a1b9c6900c6cef0e08b939cc00635ad7df02a1/1', // CZ
      'https://highlight.xyz/mint/cyber:0x03f3d8ba574B89af2A9c2199E4312837e1151750', // Cyber Chiblings
      'https://cyber.co/cyber-id', // CyberID
      'https://cyberscan.co/address/0x2d9181b954736971bb74043d4782dfe93b55a9af', // Social Summer
      'https://element.market/collections/link3-origins-nft-1', // Link3 EGG
      'https://element.market/collections/cyber-the-new-era', // New Era
    ],
  },
  2: {
    ...baseSettings,
    title: 'Dino Jump Master',
    requirement: 'Achieve 500 points in the Link3 Frame mini-game - Dino Jump',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'adhoc',
    id: 2,
    project: 'Link3',
    tags: ['Game', 'Link3', 'Achievement'],
    relatedLinks: ['https://link3.to'],
  },
  3: {
    ...baseSettings,
    title: 'Guess The Ball Master',
    requirement: 'Have a score greater than or equal to 300 on "Guess The Ball" Link3 game',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'adhoc',
    id: 3,
    project: 'Link3',
    tags: ['Game', 'Link3', 'Achievement'],
    relatedLinks: ['https://link3.to/link3'],
  },
  4: {
    ...baseSettings,
    title: 'XOUL Achiever',
    requirement: 'Get a XOUL score of 100 and hold XOUL SBT',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'adhoc',
    id: 4,
    project: 'XOUL',
    tags: ['XOUL', 'SBT', 'Score'],
    relatedLinks: ['https://xoul.xoapp.co'],
  },
  5: {
    ...baseSettings,
    title: 'Plato Registration',
    requirement: 'Register for a Plato account through the Phi platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'adhoc',
    id: 5,
    project: 'Plato',
    tags: ['Registration', 'Plato', 'Phi'],
    relatedLinks: ['https://m.getplato.app/#/phi?wallet={connected_address}'],
  },
};

export const credVerifyEndpoint: { [key: number]: string } = Object.fromEntries(
  Object.keys(credConfig).map((key) => [key, `https://${ENDPOINT}/api/verify/${key}`]),
);
