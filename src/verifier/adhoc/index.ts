import { Address } from 'viem';
import { AdhocCredConfig, CredResult } from '../../utils/types';
import { checkCyberNFTs } from './logic/cyberNFTChecker';
import { checkDinoJumpAchievement, checkGuessBallAchievement } from './logic/checkLink3Game';
import { checkXoulAchievement } from './logic/checkXoul';

export async function handleAdhocCheck(config: AdhocCredConfig, check_address: Address): Promise<CredResult> {
  switch (config.id) {
    case 1: // Cyber NFTs
      return checkCyberNFTs(check_address);
    case 2:
      return checkDinoJumpAchievement(check_address);
    case 3:
      return checkGuessBallAchievement(check_address);
    case 4:
      return checkXoulAchievement(check_address);
    default:
      console.error(`Unknown checker id: ${config.id}`);
      return [false, 'Invalid checker configuration'];
  }
}
