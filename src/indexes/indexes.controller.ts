import {
  CacheInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { isNil } from 'lodash';

import { ApiGroup } from '../common';
import { Web3Service } from '../web3/web3.service';
import { Index } from '../web3/contracs/blockchainIndexesContract';

@Controller(ApiGroup.INDEXES)
@UseInterceptors(CacheInterceptor)
export class IndexesController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get(':id')
  async getIndex(@Param('id', ParseIntPipe) id: number): Promise<Index> {
    const index = await this.web3Service.getIndex(id);

    if (isNil(index)) {
      throw new NotFoundException();
    }

    return index;
  }
}
