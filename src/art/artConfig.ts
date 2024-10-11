import 'dotenv/config';
import path from 'path';
import { Season0endDate } from '../utils/data';
import { ArtSetting } from '../utils/types';

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
    name: 'Base Cosmic Maker',
    description: '[PHI-Season-0] For the pioneers ready to explore the vast universe of onchain possibilities on Base.',
    tags: ['Base', 'Edu'],
    externalURL: 'https://base.org/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '0.gif'),
    artist: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
    receiver: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
  },
  1: {
    ...baseSettings,
    name: 'Pixel Flow',
    description: '[PHI-Season-0] Theres an inner artist in you, unleash it with this tube of BasePaint!',
    tags: ['Basepaint', 'Edu'],
    externalURL: 'https://basepaint.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '1.gif'),
    artist: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
    receiver: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
  },
  2: {
    ...baseSettings,
    name: 'Stryker',
    description: '[PHI-Season-0] The Stryke Coin Trophy.',
    tags: ['Stryke', 'Skyfor'],
    externalURL: 'https://www.stryke.xyz',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '2.webp'),
    artist: '0xcb780246010d14476ef30138cc9dfd4a37099eed',
    receiver: '0xcb780246010d14476ef30138cc9dfd4a37099eed',
  },
  3: {
    ...baseSettings,
    name: 'Frens4Ever',
    description: '[PHI-Season-0] Meet your Frenpet. Ready to spread love and joy.',
    tags: ['Frenpet', 'Soju'],
    externalURL: 'https://frenpet.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '3.gif'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  4: {
    ...baseSettings,
    name: 'PoolyBank',
    description:
      '[PHI-Season-0] This quirky purple bird is here to bring a little extra luck to your PoolTogether experience. With its beak full of possibilities, it’s the perfect charm for anyone looking to save, win, and fly high with rewards!',
    tags: ['Cabana', 'Soju', 'PoolTogether'],
    externalURL: 'https://app.cabana.fi/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '4.gif'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  5: {
    ...baseSettings,
    name: 'A Pixel is a Dot',
    description: '[PHI-Season-0] A world of digital adventures one Dot at a time.',
    tags: ['Social', 'Art', 'Musicguy', 'DOT'],
    externalURL: 'https://dot.fan/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '5.png'),
    artist: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
    receiver: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
  },
  6: {
    ...baseSettings,
    name: 'VRBS Daily',
    description:
      '[PHI-Season-0] Each pixelated VRBS personality represents the vibrant and diverse builders creating the future of digital spaces.',
    tags: ['Social', 'Picopops', 'Vrbs'],
    externalURL: 'https://vrbs.build/vrbs',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '6.gif'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
  },
  7: {
    ...baseSettings,
    name: 'Onchain Writer',
    description: '[PHI-Season-0] Embody the freedom and creativity that Paragraph offers.',
    tags: ['Writing', 'Teji', 'paragraph'],
    externalURL: 'https://paragraph.xyz',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '7.png'),
    artist: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
    receiver: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
  },
  8: {
    ...baseSettings,
    name: 'Express Yourself',
    description:
      '[PHI-Season-0] Zoras dynamic sphere symbolizing endless creative potential and infinite possibilities for exploration. There is art in every dimension.',
    tags: ['NFT', 'Art', 'Picopops', 'Zora'],
    externalURL: 'https://zora.co/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '8.gif'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
  },
  9: {
    ...baseSettings,
    name: 'Uniswap Ecosystem',
    description: '[PHI-Season-0] Uniswaps pink temple of DeFi invites you to trade, swap, and explore with ease.',
    tags: ['DeFi', 'Picopops', 'Uniswap'],
    externalURL: 'https://app.uniswap.org/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '9.gif'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
  },
  10: {
    ...baseSettings,
    name: 'Seamless, Future',
    description:
      '[PHI-Season-0] A seamless art piece showcasing that every layer represents fluidity and precision in blockchain, powered by Seamless Protocol.',
    tags: ['DeFi', 'Ryf256', 'Seamless'],
    externalURL: 'https://app.seamlessprotocol.com',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '10.gif'),
    artist: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
    receiver: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
  },
  11: {
    ...baseSettings,
    name: 'Rainbow Day',
    description:
      '[PHI-Season-0] Step into a colorful, dreamlike world where the horizon is as bright as your future in Web3. This vibrant artwork captures the spirit of exploration and wonder that comes with using Rainbow.',
    tags: ['Wallet', 'Musicguy', 'Rainbow'],
    externalURL: 'https://rainbow.me',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '11.png'),
    artist: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
    receiver: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
  },
  12: {
    ...baseSettings,
    name: 'Coin Porter CC',
    description:
      '[PHI-Season-0] With a coin in hand and a smile that says it all, this playful character embodies the fun and ease of using Reserve Protocol',
    tags: ['DeFi', 'Sukota', 'Reserve Protocol'],
    externalURL: 'https://app.reserve.org',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '12.png'),
    artist: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
    receiver: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
  },
  13: {
    ...baseSettings,
    name: 'Aeroplane',
    description: '[PHI-Season-0] Hop aboard and let this adorable plane guide you through the stars of Aerodrome!',
    tags: ['DeFi', 'Olga Kuri', 'Aerodrome'],
    externalURL: 'https://aerodrome.finance',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '13.png'),
    artist: '0x5404eA8289155B2918426640e559e6E6Db0A5f3e',
    receiver: '0x5404eA8289155B2918426640e559e6E6Db0A5f3e',
  },
  14: {
    ...baseSettings,
    name: 'Brett Enthusiast',
    description: '[PHI-Season-0] Cool vibes and good energy, thats what we Brett about.',
    tags: ['Token', 'Teji', 'Brett'],
    externalURL: 'https://www.basedbrett.com/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '14.png'),
    artist: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
    receiver: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
  },
  15: {
    ...baseSettings,
    name: 'Higher Holder',
    description: '[PHI-Season-0] Representing ambition and progress, always aim Higher.',
    tags: ['Token', 'Teji', 'Higher'],
    externalURL: 'https://basescan.org/token/0x0578d8a44db98b23bf096a382e016e29a5ce0ffe',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '15.png'),
    artist: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
    receiver: '0xBacA88029D2b4c3E7e06af8E5d7dF2E3AC8C46c9',
  },
  16: {
    ...baseSettings,
    name: 'Farcaster Dreams',
    description: '[PHI-Season-0] Portal to the Social Future',
    tags: ['Social', 'Musicguy', 'Farcaster'],
    externalURL: 'https://www.farcaster.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '16.png'),
    artist: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
    receiver: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
  },
  17: {
    ...baseSettings,
    name: 'Extra Power',
    description: '[PHI-Season-0] Go the "Extra" mile',
    tags: ['DeFi', 'Ryf256', 'Extra Finance'],
    externalURL: 'https://www.farcaster.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '17.gif'),
    artist: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
    receiver: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
  },
  18: {
    ...baseSettings,
    name: 'Nyan Bob Noun',
    description:
      '[PHI-Season-0] Embark on a vibrant, out-of-this-world journey with the Yellow Collectives afro-rocking icon. Channeling the limitless potential of creators through the universe and leaving a rainbow trail of inspiration.',
    tags: ['NFT', 'Soju', 'Yellow Collective'],
    externalURL: 'https://www.yellowcollective.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '18.gif'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  19: {
    ...baseSettings,
    name: 'The Floating Self',
    description: '[PHI-Season-0] Step into the creative playground of Phi Protocol, where you’re the artist!',
    tags: ['NFT', 'Edu', 'PHI'],
    externalURL: 'https://phiprotocol.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '19.gif'),
    artist: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
    receiver: '0xe55036B78702961e72a27D21C3EB78c71bB6a645',
  },
  20: {
    ...baseSettings,
    name: 'Lunar Luminescence',
    description:
      '[PHI-Season-0] Behold the ethereal crescent, a gateway to nocturnal wonders. This holographic moon emblem shimmers with iridescent magic, inviting you to explore the mystical realms of night. Touch to embark on a journey through dreamscapes and starlit adventures.',
    tags: ['Moonwell', 'Oz'],
    externalURL: 'https://moonwell.fi/vaults/deposit/base/mwusdc',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '20.png'),
    artist: '0x7F4c8BD0aCc303599A1AE92414B055514FFb6F81',
    receiver: '0x7F4c8BD0aCc303599A1AE92414B055514FFb6F81',
  },
  21: {
    ...baseSettings,
    name: 'Avanti-s',
    description: '[PHI-Season-0] From Atlantis to Avantis.',
    tags: ['Avantis', 'Ryf256', 'DeFi'],
    externalURL: 'https://www.avantisfi.com',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '21.gif'),
    artist: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
    receiver: '0x17756a82Cc8e9Da494bB46Bb36a342Ea9aeebfeb',
  },
  22: {
    ...baseSettings,
    name: 'The Cygnus Journey',
    description: '[PHI-Season-0] Capturing the excitement of reaching new heights in DeFi on Cygnus Finance.',
    tags: ['CYGNUS FINANCE', 'Ta2nb', 'DeFi'],
    externalURL: 'https://app.cygnus.finance/mint',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '22.png'),
    artist: '0xe53ad2e73A2BA78CbA846E3A96a62B75Ee1C113A',
    receiver: '0xe53ad2e73A2BA78CbA846E3A96a62B75Ee1C113A',
  },
  23: {
    ...baseSettings,
    name: 'Build on Base',
    description: '[PHI-Season-0] Base is where you build the future of Web3.',
    tags: ['BUILD Token', 'Zoopdrop', 'DeFi'],
    externalURL: 'https://app.cygnus.finance/mint',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '23.webp'),
    artist: '0x5c23ed6da75a583b579459e744f05a65cb51d8fd',
    receiver: '0x5c23ed6da75a583b579459e744f05a65cb51d8fd',
  },
  24: {
    ...baseSettings,
    name: 'Rolling Sushi Waves',
    description:
      '[PHI-Season-0] A Sushiswap ship navigates a serene river, its bottom made entirely of sushi. The artwork combines the worlds of food and finance in a dreamlike, idyllic setting.',
    tags: ['SushiSwap', 'Josiah', 'DeFi'],
    externalURL: 'https://www.sushi.com/swap?chainId=8453',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '24.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  25: {
    ...baseSettings,
    name: 'Whispers in the Woods',
    description:
      '[PHI-Season-0] In a forest glade, a ghostly AAVE mother tenderly releases her baby ghosts from a transparent cylinder, as if setting them free into the world. The soft, ethereal light evokes a sense of enchantment.',
    tags: ['Aave', 'Josiah', 'DeFi'],
    externalURL: 'https://app.aave.com/?marketName=proto_base_v3',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '25.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  26: {
    ...baseSettings,
    name: "Fortune's Fancy",
    description:
      '[PHI-Season-0] A whimsical magical hat spills $DEGEN coins, as if Fortune herself has smiled upon the scene. The artwork exudes a sense of lighthearted joy and the promise of good fortune.',
    tags: ['Degen', 'Josiah', 'DeFi'],
    externalURL: 'https://app.aave.com/?marketName=proto_base_v3',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '26.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  27: {
    ...baseSettings,
    name: 'BaseTag',
    description:
      '[PHI-Season-0] Whether youre repping your favorite blockchain or just want to let the world know youre BASED in all the right ways, this sticker of Jesse for Basenames is the way to go. Hand-drawn Illustration (ink on paper and digital color) by the artist Soju.',
    tags: ['Basenames', 'Soju'],
    externalURL: 'https://www.base.org/names',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '27.jpg'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
  },
  28: {
    ...baseSettings,
    name: 'Highlighting the Horizon',
    description:
      '[PHI-Season-0] An excited lady points to the sky, where a blazing "Highlight" airplane soars, carrying a banner that represents the thrill of discovery.',
    tags: ['Highlight', 'Josiah'],
    externalURL: 'https://highlight.xyz',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '28.png'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x7b74954a57ed60b8136e340aa4b937919005f507',
  },
  29: {
    ...baseSettings,
    name: 'Shaka Bros CC',
    description:
      '[PHI-Season-0] Love to roll through life with a smile and a trick up your sleeve? Shred on and Shaka off!',
    tags: ['Shredding Sassy', 'Sukota', 'Shaka'],
    externalURL: 'https://market.shreddingsassy.com/home',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '29.png'),
    artist: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
    receiver: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
  },
  30: {
    ...baseSettings,
    name: 'Fren Chain CC',
    description:
      '[PHI-Season-0]  Feed, play, and grow your pet while embarking on exciting adventures. Show your dedication by being a responsible pet owner and watch your Frenpet thrive!',
    tags: ['Frenpet', 'Sukota'],
    externalURL: 'https://frenpet.xyz/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '30.png'),
    artist: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
    receiver: '0xabc4529cb57001583e64d9d67e1658ac0ecca805',
  },
  31: {
    ...baseSettings,
    name: 'Every Dot Matters',
    description: '[PHI-Season-0] A world of digital adventures one Dot at a time.',
    tags: ['Social', 'Art', 'Musicguy', 'DOT'],
    externalURL: 'https://dot.fan/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '31.png'),
    artist: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
    receiver: '0xf56E55e35d2CCa5A34F5Ba568454974424aEA0F4',
  },
};
