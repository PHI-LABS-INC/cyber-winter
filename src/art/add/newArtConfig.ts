import 'dotenv/config';
import path from 'path';
import { SeasonEndDate } from '../../utils/data';
import { ArtSettingToCred } from '../../utils/types';

const baseSettings = {
  price: 0,
  maxSupply: undefined,
  soulbound: false,
  startDate: Math.floor(Date.now() / 1000),
  endDate: SeasonEndDate,
  artType: 'IMAGE' as const,
};

export const newSettings: { [key: number]: ArtSettingToCred } = {
  0: {
    ...baseSettings,
    credId: 1,
    name: 'Cyber Chair',
    description: 'For the pioneers ready to explore the vast universe of onchain possibilities on Cyber.',
    tags: ['Cyber', 'Test'],
    externalURL: 'https://cyber.co/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '0.png'),
    artist: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
    receiver: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
  },
};
