import { GeneralTxItem } from '../../utils/types';

export const txFilter_Standard = (tx: GeneralTxItem, contractAddress: string, methodId: string): boolean => {
  return tx.to.toLowerCase() === contractAddress.toLowerCase() && tx.methodId === methodId;
};

export const txFilter_Any = (tx: GeneralTxItem): boolean => {
  return true;
};
