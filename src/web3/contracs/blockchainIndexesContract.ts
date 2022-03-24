import ContractInfo from './ContractInfo';

type Id = number;

type GroupIds = Array<Id>;

interface Group {
  name: string;
  indexes: Array<Id>;
}

interface Index {
  id: Id;
  name: string;
  ethPriceInWei: number;
  usdPriceInCents: number;
  usdCapitalization: number;
  percentageChange: number;
}

const blockchainIndexesContract: ContractInfo = {
  address: '0x4f7f1380239450AAD5af611DB3c3c1bb51049c29',
  // NOTE: https://github.com/HvrlK/abi-contract/blob/master/Contract.abi
  jsonInterface: [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      constant: true,
      inputs: [],
      name: 'getGroupIds',
      outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ internalType: 'uint256', name: '_groupId', type: 'uint256' }],
      name: 'getGroup',
      outputs: [
        { internalType: 'string', name: 'name', type: 'string' },
        {
          internalType: 'uint256[]',
          name: 'indexes',
          type: 'uint256[]',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ internalType: 'uint256', name: '_indexId', type: 'uint256' }],
      name: 'getIndex',
      outputs: [
        { internalType: 'string', name: 'name', type: 'string' },
        {
          internalType: 'uint256',
          name: 'ethPriceInWei',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'usdPriceInCents', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'usdCapitalization',
          type: 'uint256',
        },
        { internalType: 'int256', name: 'percentageChange', type: 'int256' },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
};

export default blockchainIndexesContract;
export { Group, GroupIds, Index };
