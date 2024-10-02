import { Address, Chain } from 'viem';
import { txFilter_Any, txFilter_Standard } from '../verifier/utils/filter';

type BaseCredConfig = {
  title: string;
  description: string;
  credType: 'BASIC' | 'ADVANCED';
  network: Chain['id'];
  project: string;
  tags: string[];
  relatedLinks: string[];
  verificationSource: string;
  buyShareRoyalty: number;
  sellShareRoyalty: number;
  quantity: number;
};

export type TxFilterFunction = (
  tx: GeneralTxItem,
  contractAddresses: (Address | 'any')[],
  methodIds: (string | 'any')[],
) => boolean;

export type SignatureCredConfig = BaseCredConfig & {
  verificationType: 'SIGNATURE';
  apiChoice: 'etherscan' | 'contractCall' | 'neynar';
  apiKeyOrUrl: string;
  contractAddress: Address | Address[] | 'any';
  methodId: string | string[] | 'any';
  startBlock: string;
  endBlock: string;
  filterFunction: TxFilterFunction;
  mintEligibility: (result: number) => boolean;
  transactionCountCondition: (txs: any[], address: string) => number;
};

export type ContractCallCredConfig = BaseCredConfig & {
  verificationType: 'SIGNATURE';
  apiChoice: 'contractCall';
  apiKeyOrUrl: string;
  contractAddress: Address;
  functionName: string;
  abi: any[];
  contractCallCondition: (result: any) => boolean;
};

export type MerkleCredConfig = BaseCredConfig & {
  verificationType: 'MERKLE';
  contractAddress: Address;
  fileName: string;
};
export type NeynarCredConfig = BaseCredConfig & {
  verificationType: 'SIGNATURE';
  apiChoice: 'neynar';
  apiKey: string;
  endpoint: string;
};

export type CredConfig = SignatureCredConfig | MerkleCredConfig | ContractCallCredConfig | NeynarCredConfig;
export type CredResult = [boolean, string];

export type EtherscanFilter = (a: EtherscanTxItem) => boolean;

export type GeneralTxItem = {
  hash: string;
  from: string;
  to: string;
  blockNumber: string;
  methodId?: string; // For Etherscan's transaction data
  isError?: string; // This might be specific to Etherscan
  input?: string; // For Alchemy's transaction data
};

export type EtherscanTxItem = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

export type EtherscanResponse = {
  status: string;
  message: string;
  result: EtherscanTxItem[];
};

export type BaseArtSetting = {
  title: string;
  description: string;
  project: string;
  tags: string[];
  externalURL: string;
  price: number;
  maxSupply?: number;
  soulbound: boolean;
  startDate: number;
  endDate: number;
  artist: Address;
  receiver: Address;
};

export type ImageArtSetting = BaseArtSetting & {
  artType: 'IMAGE';
  imagePath: string;
};

export type ApiArtSetting = BaseArtSetting & {
  artType: 'API_ENDPOINT';
  endpoint: string;
  previewInput: { address: Address; data?: string };
};

export type ArtSetting = ImageArtSetting | ApiArtSetting;
