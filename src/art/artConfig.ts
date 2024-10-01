import 'dotenv/config';
import path from 'path';
import { ArtSetting } from '../utils/types';
import { Season0endDate } from '../utils/data';

const baseSettings = {
  price: 0,
  maxSupply: undefined,
  soulbound: false,
  startDate: Math.floor(Date.now() / 1000),
  endDate: Season0endDate,
  artType: 'IMAGE' as const,
};

export const artSettings: { [key: number]: ArtSetting } = {
  0: {
    ...baseSettings,
    title: 'Base Cosmic Maker',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Edu. This unique artwork captures the essence of blockchain activity on Base.',
    project: 'Base',
    tags: ['Base', 'Edu'],
    externalURL: 'https://base.org/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '0.gif'),
    artist: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
    receiver: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
  },
  1: {
    ...baseSettings,
    title: 'Pixel Flow',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Edu. This unique artwork captures the essence of blockchain activity on Base Paint.',
    project: 'BasePaint',
    tags: ['Basepaint', 'Edu'],
    externalURL: 'https://basepaint.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '1.gif'),
    artist: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
    receiver: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
  },
  2: {
    ...baseSettings,
    title: 'Stryker',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Skyfor. This unique artwork captures the essence of blockchain activity on Stryke.',
    project: 'Stryke',
    tags: ['Base', 'Skyfor'],
    externalURL: 'https://www.stryke.xyz',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '2.gif'),
    artist: '0xcb780246010d14476ef30138cc9dfd4a37099eed',
    receiver: '0xcb780246010d14476ef30138cc9dfd4a37099eed',
  },
  3: {
    ...baseSettings,
    title: 'Frens4Ever',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Soju. This unique artwork captures the essence of blockchain activity on Frenpet.',
    project: 'Frenpet',
    tags: ['Frenpet', 'Soju'],
    externalURL: 'https://frenpet.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '3.gif'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  4: {
    ...baseSettings,
    title: 'PoolyBank',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Soju. This unique artwork captures the essence of blockchain activity on Cabana.',
    project: 'Cabana',
    tags: ['Cabana', 'Soju'],
    externalURL: 'https://app.cabana.fi/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '4.gif'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  5: {
    ...baseSettings,
    title: 'dot',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Musicguy. This unique artwork captures the essence of blockchain activity on DOT.',
    project: 'Cabana',
    tags: ['Social', 'Musicguy', 'DOT'],
    externalURL: 'https://dot.fan/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '5.png'),
    artist: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
    receiver: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
  },
  6: {
    ...baseSettings,
    title: 'VRBS Daily',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Picopops. This unique artwork captures the essence of blockchain activity on Vrbs.',
    project: 'Vrbs',
    tags: ['Social', 'Picopops', 'Vrbs'],
    externalURL: 'https://vrbs.build/vrbs',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '6.gif'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
  },
};
