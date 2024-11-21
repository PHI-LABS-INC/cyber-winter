import axios from 'axios';
import { Address } from 'viem';
import { BalanceCheckCredConfig, CredResult } from '../../../utils/types';

const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000;
const MAX_DELAY = 60000; // Maximum wait of 60 seconds

// Network IDs
const ETHEREUM_MAINNET_ID = 1;
const BERACHAIN_TESTNET_ID = 80084;
const CYBER_MAINNET_ID = 7560;

interface RoutescanBalanceResponse {
  status: string;
  message: string;
  result: string;
}

interface RoutescanNFTBalanceResponse {
  status: string;
  message: string;
  result: {
    TokenAddress: string;
    TokenId: string;
    TokenName: string;
    TokenSymbol: string;
    TokenQuantity: string;
  }[];
}

function getNetworkConfig(network: number): { apiBaseURL: string; networkPath: string } {
  switch (network) {
    case ETHEREUM_MAINNET_ID:
      return {
        apiBaseURL: 'https://api.routescan.io',
        networkPath: 'mainnet/evm/1',
      };
    case BERACHAIN_TESTNET_ID:
      return {
        apiBaseURL: 'https://api.routescan.io',
        networkPath: 'testnet/evm/80084',
      };
    case CYBER_MAINNET_ID:
      return {
        apiBaseURL: 'https://api.routescan.io',
        networkPath: 'mainnet/evm/7560',
      };
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}

async function makeRoutescanRequest<T>(url: string, params: Record<string, string>, retries: number = 0): Promise<T> {
  try {
    const response = await axios.get<T>(url, { params });
    if (
      response.data &&
      typeof response.data === 'object' &&
      'status' in response.data &&
      typeof response.data.status === 'string' &&
      response.data.status === '1'
    ) {
      return response.data;
    } else {
      throw new Error(`API error: ${(response.data as any).message || 'Unknown error'}`);
    }
  } catch (error) {
    if (retries >= MAX_RETRIES - 1) {
      throw error;
    }
    const delay = Math.min(INITIAL_DELAY * Math.pow(2, retries), MAX_DELAY);
    console.log(`Request failed. Retrying in ${delay / 1000} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return makeRoutescanRequest<T>(url, params, retries + 1);
  }
}
async function fetchTokenBalanceFromRoutescan(
  address: Address,
  contractAddress: Address,
  api_key: string,
  network: number,
): Promise<RoutescanBalanceResponse> {
  const { apiBaseURL, networkPath } = getNetworkConfig(network);
  const url = `${apiBaseURL}/v2/network/${networkPath}/etherscan/api`;

  const params = {
    module: 'account',
    action: 'tokenbalance',
    contractaddress: contractAddress,
    address: address,
    tag: 'latest',
    apikey: api_key,
  };

  return makeRoutescanRequest<RoutescanBalanceResponse>(url, params);
}

async function fetchNFTBalanceFromRoutescan(
  address: Address,
  api_key: string,
  network: number,
): Promise<RoutescanNFTBalanceResponse> {
  const { apiBaseURL, networkPath } = getNetworkConfig(network);
  const url = `${apiBaseURL}/v2/network/${networkPath}/etherscan/api`;

  const params = {
    module: 'account',
    action: 'addresstokennftbalance',
    address: address,
    page: '1',
    offset: '100',
    apikey: api_key,
  };

  return makeRoutescanRequest<RoutescanNFTBalanceResponse>(url, params);
}

export async function handleBalanceCheck(config: BalanceCheckCredConfig, check_address: Address): Promise<CredResult> {
  if (config.network !== CYBER_MAINNET_ID) {
    throw new Error(`Unsupported network: ${config.network}. This function only supports testnet.`);
  }

  try {
    const response = await fetchTokenBalanceFromRoutescan(
      check_address,
      config.contractAddress as Address,
      config.apiKeyOrUrl,
      config.network,
    );
    const balance = BigInt(response.result);
    const mintEligibility = config.checkCondition(balance);

    if (config.credType === 'ADVANCED') {
      return [mintEligibility, balance.toString()];
    }
    return [mintEligibility, ''];
  } catch (error) {
    console.error('Failed to fetch token balance:', error);
    return [false, '']; // Return false eligibility in case of error
  }
}

export async function handleNFTBalanceCheck(
  config: BalanceCheckCredConfig,
  check_address: Address,
): Promise<CredResult> {
  if (config.network !== CYBER_MAINNET_ID) {
    throw new Error(`Unsupported network: ${config.network}. This function only supports cyber.`);
  }

  try {
    const response = await fetchNFTBalanceFromRoutescan(check_address, config.apiKeyOrUrl, config.network);

    // Filter NFTs based on the contract address if specified
    const relevantNFTs = config.contractAddress
      ? response.result.filter((nft) => {
          const nftAddress = nft.TokenAddress.toLowerCase();
          if (Array.isArray(config.contractAddress)) {
            return config.contractAddress.some((address) => address.toLowerCase() === nftAddress);
          } else {
            return nftAddress === config.contractAddress.toLowerCase();
          }
        })
      : response.result;
    const totalBalance = relevantNFTs.reduce((sum, nft) => sum + BigInt(nft.TokenQuantity), 0n);

    const mintEligibility = config.checkCondition(Number(totalBalance));

    if (config.credType === 'ADVANCED') {
      return [mintEligibility, Number(totalBalance).toString()];
    }
    return [mintEligibility, ''];
  } catch (error) {
    console.error('Failed to fetch NFT balance:', error);
    return [false, '']; // Return false eligibility in case of error
  }
}
