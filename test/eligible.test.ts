import { check_cred } from '../src/verifier/check';
import { TestCase, testCases } from './case/testCases';
import { credConfig } from '../src/cred/credConfig';

describe('check_cred', () => {
  Object.entries(testCases).forEach(([id, testCase]: [string, TestCase]) => {
    if (credConfig[parseInt(id)].verificationType !== 'MERKLE') {
      describe(`for id ${id}: ${testCase.title}`, () => {
        //wait a 1 seconds to avoid rate limit
        beforeEach((done) => {
          setTimeout(() => {
            done();
          }, 2000);
        });
        it('should return true and correct data for valid address', async () => {
          const [result, data] = await check_cred(testCase.addresses.valid, parseInt(id));
          expect(result).toBe(true);
          expect(testCase.expectedDataCheck(data)).toBe(true);
        });

        if ('invalid' in testCase.addresses) {
          it('should return false and empty data for invalid address', async () => {
            if (credConfig[parseInt(id)].credType === 'ADVANCED') {
              const [result, data] = await check_cred(testCase.addresses.invalid!, parseInt(id));
              expect(result).toBe(false);
              expect(data).toBe('0');
            } else {
              const [result, data] = await check_cred(testCase.addresses.invalid!, parseInt(id));
              expect(result).toBe(false);
              expect(data).toBe('');
            }
          });
        }
      });
    }
  });
});
