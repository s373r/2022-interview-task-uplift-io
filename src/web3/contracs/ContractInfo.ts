import { AbiItem } from 'web3-utils';

interface ContractInfo {
  address: string;
  jsonInterface: AbiItem[];
}

export default ContractInfo;
