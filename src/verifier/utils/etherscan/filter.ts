import { Address } from 'viem';
import { GeneralTxItem } from '../../../utils/types';

export const txFilter_Standard = (
  tx: GeneralTxItem,
  checkAddresses: (Address | 'any')[],
  methodIds: (string | 'any')[],
): boolean => {
  // Ensure tx and tx.to are defined
  if (!tx || typeof tx.to !== 'string') {
    return false;
  }

  const isCorrectContract =
    checkAddresses.includes('any') ||
    checkAddresses.some((addr) => typeof addr === 'string' && tx.to.toLowerCase() === addr.toLowerCase());

  const isCorrectMethod =
    methodIds.includes('any') || (typeof tx.methodId === 'string' && methodIds.includes(tx.methodId));

  return isCorrectContract && isCorrectMethod;
};

export const txFilter_Contract = (tx: GeneralTxItem, checkAddresses: string | string[]): boolean => {
  const addresses = Array.isArray(checkAddresses) ? checkAddresses : [checkAddresses];
  return addresses.some((address) => tx.to.toLowerCase() === address.toLowerCase());
};

export const txFilter_From = (tx: GeneralTxItem, checkAddresses: string[]): boolean => {
  const addresses = Array.isArray(checkAddresses) ? checkAddresses : [checkAddresses];
  return addresses.some((address) => tx.from.toLowerCase() === address.toLowerCase());
};

export const txFilter_Any = (tx: GeneralTxItem): boolean => {
  return true;
};
