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
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '2.webp'),
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
    title: 'A Pixel is a Dot',
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
  7: {
    ...baseSettings,
    title: 'Its Paragraph',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Teji. This unique artwork captures the essence of blockchain activity on paragraph.',
    project: 'paragraph',
    tags: ['Social', 'Teji', 'paragraph'],
    externalURL: 'https://paragraph.xyz',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '7.png'),
    artist: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
    receiver: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
  },
  8: {
    ...baseSettings,
    title: 'Express Yourself',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Picopops. This unique artwork captures the essence of blockchain activity on Zora.',
    project: 'Zora',
    tags: ['Social', 'Picopops', 'Zora'],
    externalURL: 'https://zora.co/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '8.gif'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
  },
  9: {
    ...baseSettings,
    title: 'Uniswap Ecosystem',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Picopops. This unique artwork captures the essence of blockchain activity on Uniswap.',
    project: 'Uniswap',
    tags: ['DeFi', 'Picopops', 'Uniswap'],
    externalURL: 'https://app.uniswap.org/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '9.gif'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
  },
  10: {
    ...baseSettings,
    title: 'Seamless, Future',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Ryf256. This unique artwork captures the essence of blockchain activity on Seamless.',
    project: 'Seamless',
    tags: ['DeFi', 'Ryf256', 'Seamless'],
    externalURL: 'https://app.seamlessprotocol.com',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '10.gif'),
    artist: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
    receiver: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
  },
  11: {
    ...baseSettings,
    title: 'Rainbow Day',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Musicguy. This unique artwork captures the essence of blockchain activity on Rainbow.',
    project: 'Rainbow',
    tags: ['Wallet', 'Musicguy', 'Rainbow'],
    externalURL: 'https://rainbow.me',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '11.png'),
    artist: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
    receiver: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
  },
  12: {
    ...baseSettings,
    title: 'Coin Porter CC',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Sukota. This unique artwork captures the essence of blockchain activity on Reserve Protocol.',
    project: 'Reserve Protocol',
    tags: ['DeFi', 'Sukota', 'Reserve Protocol'],
    externalURL: 'https://app.reserve.org',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '12.png'),
    artist: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
    receiver: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
  },
  13: {
    ...baseSettings,
    title: 'Aeroplane',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Olga Kuri. This unique artwork captures the essence of blockchain activity on Aerodrome.',
    project: 'Aerodrome',
    tags: ['DeFi', 'Olga Kuri', 'Aerodrome'],
    externalURL: 'https://aerodrome.finance',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '13.png'),
    artist: '0x5404eA8289155B2918426640e559e6E6Db0A5f3e',
    receiver: '0x5404eA8289155B2918426640e559e6E6Db0A5f3e',
  },
  14: {
    ...baseSettings,
    title: 'Brettime',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Teji. This unique artwork captures the essence of blockchain activity on Brett.',
    project: 'Brett Token',
    tags: ['Token', 'Teji', 'Brett Token'],
    externalURL: 'https://www.basedbrett.com/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '14.png'),
    artist: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
    receiver: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
  },
  15: {
    ...baseSettings,
    title: 'Higher n Higher',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Teji. This unique artwork captures the essence of blockchain activity on Higher.',
    project: 'Higher Token',
    tags: ['Token', 'Teji', 'Higher Token'],
    externalURL: 'https://basescan.org/token/0x0578d8a44db98b23bf096a382e016e29a5ce0ffe',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '15.png'),
    artist: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
    receiver: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
  },
  16: {
    ...baseSettings,
    title: 'Farcaster Dreams',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Musicguy. This unique artwork captures the essence of blockchain activity on Farcaster.',
    project: 'Farcaster',
    tags: ['Social', 'Musicguy', 'Farcaster'],
    externalURL: 'https://www.farcaster.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '16.png'),
    artist: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
    receiver: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
  },
  17: {
    ...baseSettings,
    title: 'For extra?',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Ryf256. This unique artwork captures the essence of blockchain activity on Extra Finance.',
    project: 'Extra Finance',
    tags: ['DeFi', 'Ryf256', 'Extra Finance'],
    externalURL: 'https://www.farcaster.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '17.gif'),
    artist: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
    receiver: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
  },
  18: {
    ...baseSettings,
    title: 'Nyan Bob Noun',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Soju. This unique artwork captures the essence of blockchain activity on Yellow Collective.',
    project: 'Yellow Collective',
    tags: ['NFT', 'Soju', 'Yellow Collective'],
    externalURL: 'https://www.yellowcollective.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '18.gif'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  19: {
    ...baseSettings,
    title: 'The Floating Self',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Edu. This unique artwork captures the essence of blockchain activity on Phi.',
    project: 'PHI',
    tags: ['NFT', 'Edu', 'PHI'],
    externalURL: 'https://phiprotocol.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '19.gif'),
    artist: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
    receiver: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
  },
  20: {
    ...baseSettings,
    title: 'Unknown',
    description: '[PHI-Season-0] Unknown',
    project: 'PHI',
    tags: ['BASE'],
    externalURL: '',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '20.png'),
    artist: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
    receiver: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
  },
  21: {
    ...baseSettings,
    title: 'Avanti-s',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Ryf256. This unique artwork captures the essence of blockchain activity on Avantis.',
    project: 'Avantis',
    tags: ['Avantis', 'Ryf256', 'DeFi'],
    externalURL: 'https://www.avantisfi.com',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '21.gif'),
    artist: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
    receiver: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
  },
  22: {
    ...baseSettings,
    title: 'The Cygnus Journey',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Ta2nb. This unique artwork captures the essence of blockchain activity on CYGNUS FINANCE.',
    project: 'CYGNUS FINANCE',
    tags: ['CYGNUS FINANCE', 'Ta2nb', 'DeFi'],
    externalURL: 'https://app.cygnus.finance/mint',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '22.png'),
    artist: '0xe53ad2e73A2BA78CbA846E3A96a62B75Ee1C113A',
    receiver: '0xe53ad2e73A2BA78CbA846E3A96a62B75Ee1C113A',
  },
  23: {
    ...baseSettings,
    title: 'Build on Base',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Zoopdrop. This unique artwork captures the essence of blockchain activity onBuild on BUILD.',
    project: 'BUILD Token',
    tags: ['BUILD Token', 'Zoopdrop', 'DeFi'],
    externalURL: 'https://app.cygnus.finance/mint',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '23.webp'),
    artist: '0x5c23ed6da75a583b579459e744f05a65cb51d8fd',
    receiver: '0x5c23ed6da75a583b579459e744f05a65cb51d8fd',
  },
  24: {
    ...baseSettings,
    title: 'Rolling Sushi Waves',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Josiah. This unique artwork captures the essence of blockchain activity onBuild on SushiSwap.',
    project: 'SushiSwap',
    tags: ['SushiSwap', 'Josiah'],
    externalURL: 'https://www.sushi.com/swap?chainId=8453',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '24.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  25: {
    ...baseSettings,
    title: 'Whispers in the Woods',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Josiah. This unique artwork captures the essence of blockchain activity onBuild on SushiSwap.',
    project: 'Aave',
    tags: ['Aave', 'Josiah', 'DeFi'],
    externalURL: 'https://app.aave.com/?marketName=proto_base_v3',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '25.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  26: {
    ...baseSettings,
    title: "Fortune's Fancy",
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Josiah. This unique artwork captures the essence of blockchain activity onBuild on Degen.',
    project: 'Degen',
    tags: ['Degen', 'Josiah', 'DeFi'],
    externalURL: 'https://app.aave.com/?marketName=proto_base_v3',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '26.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  27: {
    ...baseSettings,
    title: 'BaseTag',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Soju. This unique artwork captures the essence of blockchain activity onBuild on Basenames.',
    project: 'Basenames',
    tags: ['Basenames', 'Soju'],
    externalURL: 'https://www.base.org/names',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '27.jpg'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  28: {
    ...baseSettings,
    title: 'Highlighting the Horizon',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Josiah. This unique artwork captures the essence of blockchain activity onBuild on Highlight.xyz.',
    project: 'Highlight.xyz',
    tags: ['Highlight.xyz', 'Josiah'],
    externalURL: 'https://highlight.xyz',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '28.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  29: {
    ...baseSettings,
    title: 'Shaka Bros CC',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Sukota. This unique artwork captures the essence of blockchain activity onBuild on Shredding Sassy.',
    project: 'Shredding Sassy',
    tags: ['Shredding Sassy', 'Sukota'],
    externalURL: 'https://market.shreddingsassy.com/home',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '29.png'),
    artist: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
    receiver: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
  },
  30: {
    ...baseSettings,
    title: 'Race of Heroes',
    description:
      '[PHI-Season-0] An artistic representation of transactions on Basechain, created by the artist Outro. This unique artwork captures the essence of blockchain activity onBuild on Speedtracer.',
    project: 'Speedtracer',
    tags: ['Speedtracer', 'Outro'],
    externalURL: 'https://www.speedtracer.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '30.gif'),
    artist: '0x35d0445a9183a6dd55bb4e2ef69e37bfcddd566b',
    receiver: '0x35d0445a9183a6dd55bb4e2ef69e37bfcddd566b',
  },
};
