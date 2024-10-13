import type { VercelRequest, VercelResponse } from '@vercel/node';

import { Address } from 'viem';
import { check_cred } from '../../src/verifier/check';
import { create_signature } from '../../src/verifier/utils/signature';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id, address } = req.query;
  if (!address) {
    // If the address is not provided in the query, throw an error
    throw new Error('Address is required');
  }
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const origin = req.headers['origin'];
  const referer = req.headers['referer'];

  // Determine the source of the request
  let requestSource = 'Unknown';
  if (origin === 'https://base.terminal.phi.box' || referer?.startsWith('https://base.terminal.phi.box')) {
    requestSource = 'Frontend (base.terminal.phi.box)';
  } else if (clientIp?.includes('your-ec2-ip-here')) {
    requestSource = 'EC2 Server';
  }

  console.log(`Request received from: ${requestSource}`);
  console.log(`IP: ${clientIp}, User-Agent: ${userAgent}`);
  console.log(`Origin: ${origin}, Referer: ${referer}`);
  console.log(`Query parameters - id: ${id}, address: ${address}`);

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
