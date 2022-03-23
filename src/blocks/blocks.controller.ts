import { Controller, Get, Param } from '@nestjs/common';
import { BlockTransactionString } from 'web3-eth';

import { BlockNumber, Web3Service } from '../web3/web3.service';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get(':id')
  async getBlock(
    // TODO: it is ok for the type-checker but we need to add runtime checks as well
    @Param('id') id: BlockNumber,
  ): Promise<BlockTransactionString> {
    return this.web3Service.getBlock(id);
  }
}
