// testCases.ts
import { credConfig } from '../../src/cred/credConfig';

export const testCases = {
  0: {
    title: credConfig[0].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => parseInt(data) > 311,
  },
  1: {
    title: credConfig[1].title,
    addresses: {
      valid: '0x81a8887980DAcb896F0b5ECe068101014a417C1e',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  2: {
    title: credConfig[2].title,
    addresses: {
      valid: '0xEAd0575234bdf2fC4F86B6E4f11b4d92587964B0',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  3: {
    title: credConfig[3].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x32B8E1AE0af3F8f335F59A191617aB7A0885f6a0',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  4: {
    title: credConfig[3].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  // 4: {
  //   title: credConfig[4].title,
  //   addresses: {
  //     valid: '0x32ad053c13699253A95ABAea54b8708905f154Bc',
  //     invalid: '0x0987654321098765432109876543210987654321',
  //   },
  //   expectedDataCheck: (data: string) => data === '',
  // },
  5: {
    title: credConfig[5].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  6: {
    title: credConfig[6].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  7: {
    title: credConfig[7].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  8: {
    title: credConfig[8].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  9: {
    title: credConfig[9].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  10: {
    title: credConfig[10].title,
    addresses: {
      valid: '0x623d931AF4aC74CA4ED98B73f0c6b1eADE9E02e9',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  11: {
    title: credConfig[11].title,
    addresses: {
      // valid: '0xcD227395F0D85c6A7E25C4CAA6607acd6D119c63',
      valid: '0x2D0557F9E557052924B15abB3D0153769504b8DE',
      invalid: '0x0987654321098765432109876543210987654321',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  12: {
    title: credConfig[12].title,
    addresses: {
      valid: '0x956fD5BA28076f78dA4C590D7E48AAf8b738Fb8a',
      invalid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  13: {
    title: credConfig[13].title,
    addresses: {
      valid: '0x82D1791073BbC08792F8e4f7764d58A1fC6eE8B2',
      invalid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  14: {
    title: credConfig[14].title,
    addresses: {
      valid: '0xa3581B3C54c8C181A7f35AA1bC7d2dB3560039E9',
      invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
    },
    expectedDataCheck: (data: string) => data === '26000000000000000000000000',
  },
  15: {
    title: credConfig[15].title,
    addresses: {
      valid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
      invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
    },
    expectedDataCheck: (data: string) => data === '33292547162150163023924134',
  },
  16: {
    title: credConfig[16].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  // 16: {
  //   title: credConfig[16].title,
  //   addresses: {
  //     valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
  //     invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
  //   },
  //   expectedDataCheck: (data: string) => data === '',
  // },
  17: {
    title: credConfig[17].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  18: {
    title: credConfig[18].title,
    addresses: {
      // valid: '0xa903C06BF35286f6d1cDAD25396748353979a44C',
      valid: '0xE9d94A59799e3faAf115021b53a11398C91e1b41',
      invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  19: {
    title: credConfig[19].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  20: {
    title: credConfig[20].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x738e66480DF3A1B89778AC5557153878bC581fB9',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  21: {
    title: credConfig[21].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  22: {
    title: credConfig[22].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  23: {
    title: credConfig[23].title,
    addresses: {
      valid: '0x5589fD6856534a3AdfE16173AA308D2DC0E8Fb5B',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '37388240993000000000000000000',
  },
  24: {
    title: credConfig[24].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  25: {
    title: credConfig[25].title,
    addresses: {
      valid: '0x5Bea2b2835e359A2DE3A65F4a68fc10f2bE271EA',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  26: {
    title: credConfig[26].title,
    addresses: {
      valid: '0xEfEf4558802bF373Ce3307189C79a9cAb0a4Cb9C',
      invalid: '0x6D83cac25CfaCdC7035Bed947B92b64e6a8B8090',
    },
    expectedDataCheck: (data: string) => data >= '463178461776059131347474252',
  },
  27: {
    title: credConfig[27].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  28: {
    title: credConfig[28].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  29: {
    title: credConfig[29].title,
    addresses: {
      valid: '0xd4f4f6a1f386e041984da38e7be351903c767c2d',
      invalid: '0x0B3CF56E7dF3BB3Fb7201fFcD96d279b05DDd2E3',
    },
    expectedDataCheck: (data: string) => data === '',
  },
  30: {
    title: credConfig[30].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x32B8E1AE0af3F8f335F59A191617aB7A0885f6a0',
    },
    expectedDataCheck: (data: string) => data === '',
  },
};

export type TestCase = {
  title: string;
  addresses: {
    valid: string;
    invalid?: string;
  };
  expectedDataCheck: (data: string) => boolean;
};
