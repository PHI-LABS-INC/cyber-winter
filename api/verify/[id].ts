import type { VercelRequest, VercelResponse } from '@vercel/node';

import { Address } from 'viem';
import { check_cred } from '../../src/verifier/check';
import { create_signature } from '../../src/verifier/utils/signature';
import { create_cyber_signature } from '../../src/verifier/utils/signature2';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id, address } = req.query;
  if (!address) {
    // If the address is not provided in the query, throw an error
    throw new Error('Address is required');
  }
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const referer = req.headers['referer'];

  console.log(`Query parameters - id: ${id}, address: ${address}, Referer: ${referer},clientIp ${clientIp}`);

  try {
    const [mint_eligibility, data] = await check_cred(address as Address, Number(id));
    console.log(`Cred check result for address:${address}, ${id}: ${mint_eligibility}`);

    let signature;
    if (id == '0') {
      signature = await create_signature(address as Address, mint_eligibility, data);
    } else {
      signature = await create_cyber_signature(address as Address, mint_eligibility, data);
    }
    console.log(`Signature created, for config ${id}: ${signature}`);
    return res.status(200).json({ mint_eligibility, signature, data });
  } catch (error) {
    console.error('Error in verify:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
