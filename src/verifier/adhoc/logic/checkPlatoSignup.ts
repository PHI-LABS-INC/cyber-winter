import { Address } from 'viem';
import { CredResult } from '../../../utils/types';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
});

export async function checkPlatoSignup(check_address: Address): Promise<CredResult> {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT user_handle FROM plato_users WHERE wallet_address = $1', [
      check_address.toLowerCase(),
    ]);
    client.release();

    const isRegistered = result.rowCount > 0;
    const details = isRegistered ? `Registered with handle: ${result.rows[0].user_handle}` : 'Not registered';

    return [isRegistered, details];
  } catch (error) {
    console.error('Error checking Plato registration:', error);
    return [false, 'Error checking registration status'];
  }
}
