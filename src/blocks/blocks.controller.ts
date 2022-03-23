import { Controller, Get, Param } from '@nestjs/common';
import { BlockTransactionString } from 'web3-eth';

import { ParseBlockIdPipe } from '../parse-block-id.pipe';
import { BlockNumber, Web3Service } from '../web3/web3.service';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly web3Service: Web3Service) {}

  // TODO: docs: 400 if id is not ParseBlockIdPipe
  @Get(':id')
  async getBlock(
    @Param('id', ParseBlockIdPipe) id: BlockNumber,
  ): Promise<BlockTransactionString> {
    return this.web3Service.getBlock(id);
  }
}
