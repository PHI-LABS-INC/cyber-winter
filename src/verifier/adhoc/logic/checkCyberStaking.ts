import axios from 'axios';
import { Address } from 'viem';
import { CredResult } from '../../../utils/types';

export async function fetchCCyberTokenBalance(address: Address): Promise<CredResult> {
  const url = 'https://api.routescan.io/v2/network/mainnet/evm/7560/etherscan/api';
  const params = {
    module: 'account',
    action: 'tokenbalance',
    contractaddress: '0x522d3a9c2bc14ce1c4d210ed41ab239fded02f2b',
    address: address,
    tag: 'latest',
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data.status === '1') {
      return [parseInt(response.data.result) > 0, response.data.result];
    }
    throw new Error(response.data.message || 'Failed to fetch balance');
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}
