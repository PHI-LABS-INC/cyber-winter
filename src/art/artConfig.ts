import 'dotenv/config';
import path from 'path';
import { SeasonEndDate } from '../utils/data';
import { ArtSetting } from '../utils/types';

const baseSettings = {
  price: 0,
  maxSupply: undefined,
  soulbound: false,
  startDate: Math.floor(Date.now() / 1000),
  endDate: SeasonEndDate,
  artType: 'IMAGE' as const,
};

export const artSettings: { [key: number]: ArtSetting } = {
  0: {
    ...baseSettings,
    name: 'Cyber Chair',
    description: 'For the pioneers ready to explore the vast universe of onchain possibilities on Cyber.',
    tags: ['Cyber', 'Test'],
    externalURL: 'https://cyber.co/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '0.png'),
    artist: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
    receiver: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
  },
  1: {
    ...baseSettings,
    name: 'Chained onto Cyber',
    description: "There's might be 7 collections, but there's only 1 you. Thank you for minting on Cyber.",
    tags: ['Cyber', 'Maning'],
    externalURL: 'https://cyber.co/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '1.gif'),
    artist: '0x1ED4a7446556ed14593e15CDBA22B1BBA158Cf8c',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
  2: {
    ...baseSettings,
    name: 'Dino Arcade',
    description: 'When Dino Jump meets Philand in arcade style - this one is for the grinders!',
    tags: ['Cyber', 'Maning', 'Link3'],
    externalURL: 'https://link3.to',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '2.gif'),
    artist: '0x1ED4a7446556ed14593e15CDBA22B1BBA158Cf8c',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
  3: {
    ...baseSettings,
    name: 'Tricky Cup',
    description: '3 cups, 2 cups, 1 cup = Tricky Cup',
    tags: ['Cyber', 'picopops', 'Link3'],
    externalURL: 'https://link3.to',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '3.png'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
  4: {
    ...baseSettings,
    name: 'Lovers Paradise',
    description: 'One kiss away from your XOUL mate.',
    tags: ['Cyber', 'XOUL', 'josiah', 'datartist'],
    externalURL: 'https://xoul.xoapp.co',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '4.webp'),
    artist: '0x7b74954a57ed60b8136e340aa4b937919005f507',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
  5: {
    ...baseSettings,
    name: 'Plato Cupcakie',
    description: 'Eat your hearts worth on Plato and savour the cupcake.',
    tags: ['Cyber', 'Plato', 'picopops'],
    externalURL: 'https://m.getplato.app/',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '5.webp'),
    artist: '0xbe5c30204bB53287A65057dac7e86e209a9DD1dC',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
  6: {
    ...baseSettings,
    name: 'Raining ETH',
    description: "Wherever you go on Ether Eaters, you'll see ETH raining upon you.",
    tags: ['Cyber', 'Ether Eatero', 'soju'],
    externalURL: 'https://link3.to/link3',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '6.gif'),
    artist: '0x8CbF96319b3C56d50a7C82EFb6d3c46bD6f889Ba',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
  7: {
    ...baseSettings,
    name: 'Commit Switch',
    description: 'A badge of honour for you Commitment to the Cyber x Phi campaign.',
    tags: ['Cyber', 'Commit', 'oz'],
    externalURL: 'https://x.com/commitwtf',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '7.webp'),
    artist: '0x7F4c8BD0aCc303599A1AE92414B055514FFb6F81',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
  8: {
    ...baseSettings,
    name: 'Commit Party Mode',
    description: 'Oof you did it! Switched on, and completed your first Commit!',
    tags: ['Cyber', 'Commit', 'maning'],
    externalURL: 'https://x.com/commitwtf',
    imagePath: path.join(process.cwd(), 'public/assets/images/prod', '8.gif'),
    artist: '0x1ED4a7446556ed14593e15CDBA22B1BBA158Cf8c',
    receiver: '0x2FddD054BC20ba51543D4253A93E32a13Ee61Eba',
  },
};
