import { AbiItem } from 'web3-utils';

interface ContractInfo {
  address: string;
  jsonInterface: Array<AbiItem>;
}

export default ContractInfo;
