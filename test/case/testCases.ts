// testCases.ts
import { credConfig } from '../../src/cred/credConfig';

export const testCases = {
  0: {
    title: credConfig[0].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => parseInt(data) > 0,
  },
  1: {
    title: credConfig[1].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => data == '',
  },
  2: {
    title: credConfig[2].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => parseInt(data) > 0,
  },
  3: {
    title: credConfig[3].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => parseInt(data) > 0,
  },
  4: {
    title: credConfig[4].title,
    addresses: {
      valid: '0xE95330D7CDcd37bf0Ad875C29e2a2871FeFa3De8',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => parseInt(data) > 0,
  },
  5: {
    title: credConfig[5].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x1d8A4B2594050166a05c19eBe8b4cf1A41F3908C',
    },
    expectedDataCheck: (data: string) => data == '',
  },
  6: {
    title: credConfig[6].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0x1d8A4B2594050166a05c19eBe8b4cf1A41F3908C',
    },
    expectedDataCheck: (data: string) => data == '',
  },
  7: {
    title: credConfig[7].title,
    addresses: {
      valid: '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => data == '',
  },
  8: {
    title: credConfig[8].title,
    addresses: {
      valid: '0x2D0557F9E557052924B15abB3D0153769504b8DE',
      invalid: '0xb7Caa0ed757bbFaA208342752C9B1c541e36a4b9',
    },
    expectedDataCheck: (data: string) => data == '',
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
