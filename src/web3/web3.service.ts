import Web3 from 'web3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockTransactionString } from 'web3-eth';

// TODO: import aliases instead relative paths
import Web3ErrorHelper from './Web3ErrorHelper';
import blockchainIndexesContract, {
  BlockchainIndexesContract,
  Group,
  GroupIds,
  Index,
} from './contracs/blockchainIndexesContract';
import { ConfigVariable, ConfigVariables } from '../config';
import { Nullable } from '../common';

// NOTE: we redeclare BlockNumber for our task requirements
//       (only number (id) or latest)
//       instead of using existing one from web3-core
type BlockNumber = number | 'latest';

@Injectable()
class Web3Service {
  private readonly web3: Web3;
  private readonly contract: BlockchainIndexesContract;

  constructor(
    private readonly configService: ConfigService<ConfigVariables, true>,
  ) {
    const httpEndpoint = this.configService.get(
      ConfigVariable.WEB3_HTTP_ENDPOINT,
      {
        infer: true,
      },
    );
    const provider = new Web3.providers.HttpProvider(httpEndpoint);

    this.web3 = new Web3(provider);

    const { address, jsonInterface } = blockchainIndexesContract;

    this.contract = new this.web3.eth.Contract(jsonInterface, address);
  }

  async getBlock(id: BlockNumber): Promise<Nullable<BlockTransactionString>> {
    return this.web3.eth.getBlock(id);
  }

  getGroupIds(): Promise<GroupIds> {
    return this.contract.methods.getGroupIds().call();
  }

  async getGroup(id: number): Promise<Nullable<Group>> {
    let group;

    try {
      group = await this.contract.methods.getGroup(id).call();
    } catch (e) {
      if (Web3ErrorHelper.isInvalidGroupIdError(e)) {
        return null;
      }

      throw e;
    }

    return group;
  }

  async getIndex(id: number): Promise<Nullable<Index>> {
    let index;

    try {
      index = await this.contract.methods.getIndex(id).call();
    } catch (e) {
      if (Web3ErrorHelper.isInvalidIndexIdError(e)) {
        return null;
      }

      throw e;
    }

    return index;
  }
}

export { BlockNumber, Web3Service };
