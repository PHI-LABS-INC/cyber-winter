import 'dotenv/config';
import path from 'path';
import { Season0endDate } from '../../utils/data';
import { ArtSettingToCred } from '../../utils/types';

const baseSettings = {
  price: 0,
  maxSupply: undefined,
  soulbound: false,
  startDate: Math.floor(Date.now() / 1000),
  endDate: Season0endDate,
  artType: 'IMAGE' as const,
};

export const newSettings: { [key: number]: ArtSettingToCred } = {
  0: {
    ...baseSettings,
    credId: 28,
    name: 'Call me Bob.base',
    description:
      'A snuggly monster spreads love and warmth, representing the inclusive and friendly vibe of the base ecosystem.',
    tags: ['Base', 'BaseName', 'Josiah'],
    externalURL: 'https://www.base.org/names',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod/new', '0.webp'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  1: {
    ...baseSettings,
    credId: 20,
    name: 'Harmony in Chroma',
    description: 'Harmony in Chroma is a digital art where beauty and logic entwine.',
    tags: ['Base', 'Phi', 'Josiah'],
    externalURL: 'https://phi.box',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod/new', '1.jpg'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  2: {
    ...baseSettings,
    credId: 17,
    name: 'Farcaster Unbound',
    description:
      "Farcaster's hero embodies the unstoppable force of free expression, soaring through the city to defend the right to speak freely and challenge the status quo. This vibrant artwork captures the essence of decentralization and the unrelenting pursuit of truth.",
    tags: ['Base', 'Josiah', 'farcaster'],
    externalURL: 'https://www.farcaster.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod/new', '2.jpg'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
};
