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
    filterFunction: txFilter_Standard,
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
    methodId: 'any', // 0x72c275a4
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
  7: {
    ...baseSettings,
    title: 'Create and Mint on paragraph.xyz',
    description: 'Create and mint content on paragraph.xyz',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x9Bf9D0D88C1A835F1052Ef0FBa325b35bBea127a',
    methodId: '0x3a81b8a5',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'paragraph.xyz',
    tags: ['Content', 'NFT'],
    relatedLinks: ['https://paragraph.xyz/discover/feed/recent/paragraph'],
  },
  8: {
    ...baseSettings,
    title: 'Create Collection on Zora (Base)',
    description: 'Create a new collection on Zora on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x777777C338d93e2C7adf08D102d45CA7CC4Ed021',
    methodId: '0x0582823a',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Zora',
    tags: ['NFT'],
    relatedLinks: ['https://zora.co/'],
  },
  9: {
    ...baseSettings,
    title: 'Execute Swap on Uniswap (Base)',
    description: 'Perform a token swap on Uniswap on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    methodId: '0x3593564c',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Uniswap',
    tags: ['DeFi', 'Swap'],
    relatedLinks: ['https://app.uniswap.org/'],
  },
  10: {
    ...baseSettings,
    title: 'Deposit ETH to Seamless and leverage',
    description: 'Deposit ETH and create a leveraged position on Seamless',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x5Ed6167232b937B0A5C84b49031139F405C09c8A',
    methodId: '0xbc157ac1',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Seamless',
    tags: ['DeFi', 'Leverage'],
    relatedLinks: [
      'https://app.seamlessprotocol.com/#/?tab=Earn&asset=0x4200000000000000000000000000000000000006-0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    ],
  },
  11: {
    ...baseSettings,
    title: 'Execute Swap on Rainbow (Base)',
    description: 'Perform a token swap on Rainbow on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x00000000009726632680FB29d3F7A9734E3010E2',
    methodId: '0x999b6464',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'rainbow',
    tags: ['Wallet'],
    relatedLinks: ['https://rainbow.me/'],
  },
  12: {
    ...baseSettings,
    title: 'Mint bsdETH in Reserve Protocol (Base)',
    description: 'Mint bsdETH token in Reserve Protocol on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xe811b62AB97d9370cE2e25F9ceBC904522b81FE1',
    methodId: '0xdd074ea0',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Reserve Protocol',
    tags: ['DeFi', 'Stablecoin'],
    relatedLinks: [
      'https://app.reserve.org/base/token/0xcb327b99ff831bf8223cced12b1338ff3aa322ff/overview',
      'https://basescan.org/address/0xe811b62ab97d9370ce2e25f9cebc904522b81fe1',
    ],
  },
  13: {
    ...baseSettings,
    title: 'Add Liquidity on Aerodrome (Base)',
    description: 'Add liquidity to a pool on Aerodrome on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
    methodId: ['0xb7e0d4c0', '0x5a47ddc3'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Aerodrome',
    tags: ['DeFi', 'Liquidity'],
    relatedLinks: [
      'https://aerodrome.finance/pools',
      'https://basescan.org/address/0xcf77a3ba9a5ca399b7c97c74d54e5b1beb874e43',
    ],
  },
  14: {
    ...baseSettings,
    title: 'Holder of Brett Token',
    description: 'Own at least one Brett Token',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x532f27101965dd16442E59d40670FaF5eBB142E4',
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
    project: 'Brett Token',
    tags: ['Token', 'Holder'],
    relatedLinks: [
      'https://www.basedbrett.com/',
      'https://basescan.org/address/0x532f27101965dd16442e59d40670faf5ebb142e4#readContract',
    ],
  },
  15: {
    ...baseSettings,
    title: 'Holder of Higher Token',
    description: 'Own at least one Higher Token',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x0578d8a44db98b23bf096a382e016e29a5ce0ffe',
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
    project: 'Higher Token',
    tags: ['Token', 'Holder'],
    relatedLinks: ['https://basescan.org/token/0x0578d8a44db98b23bf096a382e016e29a5ce0ffe'],
  },
  16: {
    ...baseSettings,
    title: 'Verified Farcaster User',
    description: 'Check if the address is verified on Farcaster',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'neynar',
    apiKey: process.env.NEYNAR_API_KEY ?? '',
    endpoint: 'https://api.neynar.com/v1/farcaster/user-by-verification',
    project: 'Farcaster',
    tags: ['Social', 'Verification'],
    relatedLinks: ['https://www.farcaster.xyz/'],
  },
  17: {
    ...baseSettings,
    title: 'Create Leveraged Farming Position in Extra Finance (Base)',
    description: 'Create a leveraged farming position on Extra Finance on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xf9cFB8a62f50e10AdDE5Aa888B44cF01C5957055',
    methodId: '0x4dbe83ed',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Extra Finance',
    tags: ['DeFi', 'Farming', 'Leverage'],
    relatedLinks: ['https://app.extrafi.io/farm'],
  },
  18: {
    ...baseSettings,
    title: 'Place Bid on Yellow Collective',
    description: 'Place a bid on Yellow Collective platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x0aa23A7E112889C965010558803813710beCF263',
    methodId: ['0x659dd2b4', '0xc0d5bb8b'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Yellow Collective',
    tags: ['NFT', 'Auction'],
    relatedLinks: ['https://www.yellowcollective.xyz/'],
  },
  19: {
    ...baseSettings,
    title: 'Mint Why Phi',
    description: 'Mint a Why Phi token on Phi protocol',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xc649989246FAa59bBefA7c65551cc4461E823320',
    methodId: '0x6a627842',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Phi Protocol',
    tags: ['NFT', 'Minting'],
    relatedLinks: [
      'https://phiprotocol.xyz/',
      'https://basescan.org/address/0xc649989246faa59bbefa7c65551cc4461e823320',
    ],
  },
  20: {
    ...baseSettings,
    title: 'Contract Creator on Base',
    description: 'Deploy a smart contract on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: 'any',
    methodId: 'any',
    filterFunction: txFilter_Any,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) => txs.filter((tx) => tx.to === '').length,
    project: 'Base',
    tags: ['Smart Contract', 'Development'],
    relatedLinks: ['https://docs.base.org/building-with-base/'],
  },
  21: {
    ...baseSettings,
    title: 'Execute Trade on Avantis',
    description: 'Execute a trade on Avantis platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x5FF292d70bA9cD9e7CCb313782811b3D7120535f',
    methodId: '0xf5567637',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Avantis',
    tags: ['DeFi', 'Trading'],
    relatedLinks: ['https://www.avantisfi.com/trade'],
  },
  22: {
    ...baseSettings,
    title: 'Mint cgUSD on CYGNUS FINANCE',
    description: 'Mint cgUSD token on CYGNUS FINANCE platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xCa72827a3D211CfD8F6b00Ac98824872b72CAb49',
    methodId: '0x40c10f19',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'CYGNUS FINANCE',
    tags: ['DeFi', 'Stablecoin'],
    relatedLinks: [
      'https://app.cygnus.finance/mint',
      'https://basescan.org/tx/0x5fc2bfc66eb2c44e1e2ab2ea89479552f7f8b99c61de2afba7efdbe113b303bd',
    ],
  },
  23: {
    ...baseSettings,
    title: 'Holder of BUILD Token',
    description: 'Own at least one BUILD Token',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x3c281a39944a2319aa653d81cfd93ca10983d234',
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
    project: 'BUILD Token',
    tags: ['Token', 'Holder'],
    relatedLinks: ['https://www.build.top/', 'https://basescan.org/token/0x3c281a39944a2319aa653d81cfd93ca10983d234'],
  },
  24: {
    ...baseSettings,
    title: 'Execute Swap on SushiSwap (Base)',
    description: 'Perform a token swap on SushiSwap on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55', // SushiSwap Router contract on Base
    methodId: '0x6678ec1f', // This is the method ID for processRouteWithTransferValueOutput
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'SushiSwap',
    tags: ['DeFi', 'Swap'],
    relatedLinks: ['https://www.sushi.com/swap?chainId=8453'],
  },
  25: {
    ...baseSettings,
    title: 'Supply to Aave v3 on Base',
    description: 'Supply assets to Aave v3 lending pool on Base network',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: ['0x8be473dCfA93132658821E67CbEB684ec8Ea2E74', '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5'],
    methodId: ['0x474cf53d', '0x617ba037'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Aave',
    tags: ['DeFi', 'Lending'],
    relatedLinks: [
      'https://app.aave.com/?marketName=proto_base_v3',
      'https://basescan.org/address/0x8be473dCfA93132658821E67CbEB684ec8Ea2E74',
      'https://basescan.org/address/0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
    ],
  },
  26: {
    ...baseSettings,
    title: 'Holder of Degen Token',
    description: 'Own at least one Degen Token',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
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
    project: 'DegenToken',
    tags: ['Token', 'Degen'],
    relatedLinks: ['https://basescan.org/token/0x4ed4e862860bed51a9570b96d89af5e1b0efefed', 'https://www.degen.tips/'],
  },
  27: {
    ...baseSettings,
    title: 'Register name on Basenames',
    description:
      'Basenames are a core onchain building block that enable builders to establish their identity on Base by registering human-readable names for their wallet address(es).',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5',
    methodId: '0xc7c79676',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Basenames',
    tags: ['Base'],
    relatedLinks: ['https://www.base.org/names'],
  },
  28: {
    ...baseSettings,
    title: 'Mint on Highlight.xyz',
    description: 'Mint NFTs on Highlight.xyz platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: ['0xd9E58978808d17F99ccCEAb5195B052E972c0188', '0x481f9289257795bbC5Cc9bab8c986D3377450331'], // Highlight.xyz contract address
    methodId: ['0x02c3a65b', '0xcdacf467'], // mint function method ID
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Highlight.xyz',
    tags: ['NFT', 'Minting'],
    relatedLinks: ['https://highlight.xyz/'],
  },
  29: {
    ...baseSettings,
    title: 'Shredding Sassy',
    description: 'Own at least one Shredding Sassy',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x227f81f5f697cdd9554a43bbab01d7a85b9466c1',
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
    project: 'Shredding Sassy',
    tags: ['NFT'],
    relatedLinks: [
      'https://market.shreddingsassy.com/home',
      'https://market.shreddingsassy.com/collections/0x227f81f5f697cdd9554a43bbab01d7a85b9466c1/networks/base',
    ],
  },
  30: {
    ...baseSettings,
    title: 'Submit Result on Speedtracer',
    description: 'Submit a result on the Speedtracer platform',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.BASESCAN_API_KEY ?? '',
    contractAddress: '0xCD45E55DB12E9CA3E82370F5D0c5C6876bF6f466',
    methodId: '0x72c275a4',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Speedtracer',
    tags: ['Gaming'],
    relatedLinks: [
      'https://www.speedtracer.xyz/',
      'https://basescan.org/address/0xCD45E55DB12E9CA3E82370F5D0c5C6876bF6f466',
    ],
  },
};

export const credVerifyEndpoint: { [key: number]: string } = Object.fromEntries(
  Object.keys(credConfig).map((key) => [key, `https://${ENDPOINT}/api/verify/${key}`]),
);
