import axios from 'axios';
import { Address } from 'viem';
import { CredResult } from '../../../utils/types';

/**
 * Checks gas usage for a given address on Cyber network
 */
export async function checkCyberGasFee(address: Address): Promise<CredResult> {
  const API_KEY = process.env.SOCIALSCAN_API_KEY;
  const BASE_URL = 'https://api.socialscan.io/cyber/v1/developer/api';
  const PAGE_SIZE = 10000;
  let allTransactions: any[] = [];
  let currentPage = 1;

  try {
    while (true) {
      // Fetch transaction history for current page
      const response = await axios.get(BASE_URL, {
        params: {
          module: 'account',
          action: 'txlist',
          address: address,
          startblock: '0',
          endblock: '99999999',
          sort: 'asc',
          page: currentPage,
          offset: PAGE_SIZE,
        },
        headers: {
          'x-api-key': API_KEY,
        },
      });

      if (response.data.status === '0') {
        if (response.data.message === 'No transactions found' && currentPage === 1) {
          return [false, '0'];
        }
        break; // No more transactions to fetch
      }

      const transactions = response.data.result || [];
      if (transactions.length === 0) break;

      allTransactions = [...allTransactions, ...transactions];

      // Check if we need to fetch more pages
      if (transactions.length < PAGE_SIZE) break;

      // Add delay to prevent rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
      currentPage++;
    }

    // Calculate total gas used from all transactions
    let totalGasFee = 0n;

    allTransactions.forEach((tx: any) => {
      if (tx.gasUsed && tx.gasPrice) {
        const gasUsed = BigInt(tx.gasUsed);
        const gasPrice = BigInt(tx.gasPrice);
        totalGasFee += gasUsed * gasPrice;
      }
    });

    // Convert from Wei to ETH
    const totalGasInEth = Number(totalGasFee) / 1e18;
    console.log(`Total gas fees for ${address}: ${totalGasInEth} ETH`);
    // Return true if transactions exist and total gas fees
    return [allTransactions.length > 0, totalGasInEth.toString()];
  } catch (error: any) {
    console.error('Error checking gas fees:', error.response?.data || error.message);

    if (error.response?.status === 404) {
      return [false, '0'];
    }

    throw new CyberAPIError(error.response?.data?.message || error.message);
  }
}

/**
 * Formats gas fee to human readable string
 */
export function formatGasFee(gasFee: string): string {
  const fee = parseFloat(gasFee);
  return `${fee.toFixed(6)} ETH`;
}

/**
 * Custom error class for API errors
 */
export class CyberAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CyberAPIError';
  }
}
