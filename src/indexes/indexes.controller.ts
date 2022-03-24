import {
  CacheInterceptor,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { isNil } from 'lodash';

import { ApiGroup } from '../common';
import { Web3Service } from '../web3/web3.service';
import { Index } from '../web3/contracs/blockchainIndexesContract';

@ApiTags(ApiGroup.INDEXES)
@Controller(ApiGroup.INDEXES)
@UseInterceptors(CacheInterceptor)
export class IndexesController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The requested index is returned',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '"id" is not a number',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The requested index is not found',
  })
  async getIndex(@Param('id', ParseIntPipe) id: number): Promise<Index> {
    const index = await this.web3Service.getIndex(id);

    if (isNil(index)) {
      throw new NotFoundException();
    }

    return index;
  }
}
