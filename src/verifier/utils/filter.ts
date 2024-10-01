import { GeneralTxItem } from '../../utils/types';

export const txFilter_Standard = (tx: GeneralTxItem, contractAddress: string, methodId: string): boolean => {
  return tx.to.toLowerCase() === contractAddress.toLowerCase() && tx.methodId === methodId;
};

export const txFilter_Contract = (tx: GeneralTxItem, contractAddresses: string | string[]): boolean => {
  const addresses = Array.isArray(contractAddresses) ? contractAddresses : [contractAddresses];
  return addresses.some((address) => tx.to.toLowerCase() === address.toLowerCase());
};

export const txFilter_Any = (tx: GeneralTxItem): boolean => {
  return true;
};
