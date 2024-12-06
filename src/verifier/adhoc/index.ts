import { Address } from 'viem';
import { AdhocCredConfig, CredResult } from '../../utils/types';
import { checkCyberNFTs } from './logic/cyberNFTChecker';
import { checkDinoJumpAchievement, checkGuessBallAchievement } from './logic/checkLink3Game';
import { checkXoulAchievement } from './logic/checkXoul';
import { checkPlatoSignup } from './logic/checkPlatoSignup';
import { checkCommitParticipation } from './logic/checkCommit';

import checkEtherEater from './logic/checkEtherEater';
import { checkPhiNFTCredentials } from './logic/checkPhiNFT';
import { fetchCCyberTokenBalance } from './logic/checkCyberStaking';

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
    case 5:
      return checkPlatoSignup(check_address);
    case 6:
      return checkEtherEater(check_address);
    case 7:
      return checkCommitParticipation(check_address);
    case 8:
      return checkPhiNFTCredentials(check_address);
    case 9:
      return fetchCCyberTokenBalance(check_address);
    default:
      console.error(`Unknown checker id: ${config.id}`);
      return [false, 'Invalid checker configuration'];
  }
}
