import { Address } from 'viem';
import { CredResult } from '../../../utils/types';
import axios from 'axios';
import { off } from 'process';

interface XoulResponse {
  isBound: boolean;
  isVerified: boolean;
  score: number;
  address: string;
}

interface RoutescanTxResponse {
  status: string;
  message: string;
  result: {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    from: string;
    to: string;
    methodId: string;
  }[];
}

const XOUL_SBT_ADDRESS = '0x84583e7d2d92d87d5b3bac850ab4bad37ae568e8';
const SBT_UPDATE_METHOD_ID = '0x78fea6ac';

async function checkXoulScore(check_address: Address): Promise<number> {
  try {
    const response = await axios.get<XoulResponse>(
      `https://api.rooit.net/latest/crypto/xoul/eoa-bound?address=${check_address}`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    if (!response.data.isBound) {
      console.log('Address not bound to XOUL');
      return 0;
    }

    return response.data.score;
  } catch (error) {
    console.error('Error fetching XOUL score:', error);
    return 0;
  }
}

async function checkSbtUpdated(check_address: Address): Promise<boolean> {
  const url = `https://api.routescan.io/v2/network/mainnet/evm/7560/etherscan/api`;
  const api_key = process.env.ROUTESCAN_API_KEY;
  const params = {
    module: 'account',
    action: 'txlist',
    address: check_address,
    startblock: '0',
    endblock: '99999999',
    apikey: api_key,
    page: '1',
    offset: '10000',
  };

  try {
    const response = await axios.get<RoutescanTxResponse>(url, { params });

    if (response.data.status !== '1') {
      throw new Error(`API error: ${response.data.message}`);
    }

    const hasSbtUpdate = response.data.result.some(
      (tx) =>
        tx.to.toLowerCase() === XOUL_SBT_ADDRESS.toLowerCase() &&
        tx.methodId.toLowerCase() === SBT_UPDATE_METHOD_ID.toLowerCase(),
    );

    return hasSbtUpdate;
  } catch (error) {
    console.error('Error checking SBT updates:', error);
    return false;
  }
}
export async function checkXoulAchievement(check_address: Address): Promise<CredResult> {
  const REQUIRED_SCORE = 100;

  // 両方のチェックを並列で実行
  const [score, hasSbt] = await Promise.all([checkXoulScore(check_address), checkSbtUpdated(check_address)]);

  // スコアとSBT保有の両方の条件を満たす必要がある
  const achieved = score >= REQUIRED_SCORE && hasSbt;

  // スコアの詳細を返す
  const details = `Score: ${score}${hasSbt ? ', Has XOUL SBT' : ', No XOUL SBT'}`;

  return [achieved, details];
}
