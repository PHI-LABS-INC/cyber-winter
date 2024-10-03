import { encodeAbiParameters, keccak256, parseAbiParameters, toBytes, Hex, toHex } from 'viem';
import { create_signature } from '../src/verifier/utils/signature';
import { bytesToHex, privateToPublic } from '@ethereumjs/util';
import { extractPublicKey } from '@metamask/eth-sig-util';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env') });

const privateKey = Buffer.from(process.env.VERIFIER_PRIVATE_KEY?.slice(2) as string, 'hex');

describe('create_signature', function () {
  it('should sign a message correctly', async function () {
    const address = '0x5cd18da4c84758319c8e1c228b48725f5e4a3506';
    const mint_eligibility = true;
    const data = '44';

    const signature = await create_signature(address, mint_eligibility, data);
    expect(signature).toMatch(/^0x[a-f0-9]{128}$/);
  });

  it('should recover the public key from a signature', async () => {
    const address = '0x1234567890123456789012345678901234567890';
    const mint_eligibility = true;
    const data = '123456789332';

    const signature = await create_signature(address, mint_eligibility, data);
    const typesArray = 'address, bool, bytes32';
    const publicKey = bytesToHex(privateToPublic(privateKey));
    const valueArray: [`0x${string}`, boolean, `0x${string}`] = [
      address as `0x${string}`,
      mint_eligibility,
      toHex(data, { size: 32 }) as `0x${string}`,
    ];

    const hashBuff = keccak256(toBytes(encodeAbiParameters(parseAbiParameters(typesArray), valueArray)));
    const expected = extractPublicKey({ data: hashBuff, signature });

    expect(expected).toBe(publicKey);
  });
});
