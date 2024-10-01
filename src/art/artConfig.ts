import 'dotenv/config';
import path from 'path';
import { ArtSetting } from '../utils/types';
import { Season0endDate } from '../utils/data';

export const artSettings: { [key: number]: ArtSetting } = {
  0: {
    title: 'Base Cosmic Maker',
    description:
      'An artistic representation of transactions on Basechain, created by the artist Edu. This unique artwork captures the essence of blockchain activity on Base.',
    project: 'Base',
    tags: ['Transaction', 'Base', 'Edu'],
    externalURL: 'https://base.org/',
    price: 0,
    maxSupply: undefined,
    soulbound: false,
    startDate: Math.floor(Date.now() / 1000),
    endDate: Season0endDate,
    artType: 'IMAGE' as const,
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '0.gif'),
    artist: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
  },
};
