import Web3 from 'web3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockTransactionString } from 'web3-eth';

// TODO: import aliases instead relative paths
import { ConfigVariable, ConfigVariables } from '../config';

// NOTE: we redeclare BlockNumber for our task requirements
//       (only number (id) or latest)
//       instead of using existing one from web3-core
type BlockNumber = number | 'latest';

@Injectable()
export class Web3Service {
  private readonly web3: Web3;

  constructor(private readonly configService: ConfigService<ConfigVariables>) {
    const httpEndpoint = configService.get(ConfigVariable.WEB3_HTTP_ENDPOINT, {
      infer: true,
    });
    const provider = new Web3.providers.HttpProvider(httpEndpoint);

    this.web3 = new Web3(provider);
  }

  async getBlock(id: BlockNumber): Promise<BlockTransactionString> {
    return this.web3.eth.getBlock(id);
  }
}
