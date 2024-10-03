import type { VercelRequest, VercelResponse } from '@vercel/node';

import { create_signature } from '../../src/verifier/utils/signature';
import { check_cred } from '../../src/verifier/check';
import { Address } from 'viem';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id, address } = req.query;
  if (!address) {
    // If the address is not provided in the query, throw an error
    throw new Error('Address is required');
  }
  try {
    // Check credential 0 ('Complete a transaction on Basechain') for the address
    const [mint_eligibility, data] = await check_cred(address as Address, Number(id));
    console.log(`Cred check result for address:${address}, ${id}: ${mint_eligibility}`);

    const signature = await create_signature(address as Address, mint_eligibility, data);
    console.log(`Signature created for config ${id}: ${signature}`);
    return res.status(200).json({ mint_eligibility, signature, data });
  } catch (error) {
    console.error('Error in verify:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
