import 'dotenv/config';
import { txFilter_Any, txFilter_Standard } from '../verifier/utils/filter';
import { CredConfig } from '../utils/types';

export const credConfig: { [key: number]: CredConfig } = {
  0: {
    title: 'Number of transactions on Basechain',
    description: 'Execute any transaction on Basechain',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: 'any',
    methodId: 'any',
    network: 8453,
    startBlock: '0',
    endBlock: 'latest',
    filterFunction: txFilter_Any,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Base',
    tags: ['Transaction'],
    relatedLinks: ['https://base.org/'],
    verificationSource: 'https://github.com/ZaK3939/phi-sdk-example',
    buyShareRoyalty: 100, // buy share royalty 1 %
    sellShareRoyalty: 100, // sell royalty 1 %
    quantity: 1, // initial share quantity
  },
};

export const credVerifyEndpoint: { [key: number]: string | undefined } = {
  0: 'https://phi-sdk.vercel.app/api/verify/0',
};
