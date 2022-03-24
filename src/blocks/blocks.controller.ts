import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlockTransactionString } from 'web3-eth';

import { ApiGroup } from '../common';
import { ParseBlockIdPipe } from '../parse-block-id.pipe';
import { BlockNumber, Web3Service } from '../web3/web3.service';

@ApiTags(ApiGroup.BLOCKS)
@Controller(ApiGroup.BLOCKS)
@UseInterceptors(CacheInterceptor)
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
