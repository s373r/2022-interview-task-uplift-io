import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BlockTransactionString } from 'web3-eth';

import { ApiGroup } from '../common';
import { ParseBlockIdPipe } from '../parse-block-id.pipe';
import { BlockNumber, Web3Service } from '../web3/web3.service';

@ApiTags(ApiGroup.BLOCKS)
@Controller(ApiGroup.BLOCKS)
@UseInterceptors(CacheInterceptor)
export class BlocksController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get(':id')
  @ApiOkResponse({
    description: 'The requested block is returned',
  })
  @ApiBadRequestResponse({
    description: '"id" is not a valid block ID',
  })
  @ApiNotFoundResponse({
    description: 'The requested group is not found',
  })
  @ApiParam({
    name: 'id',
    // TODO: The following schema does not work -- figure out why
    schema: {
      oneOf: [{ type: 'string', enum: ['latest'] }, { type: 'integer' }],
    },
  })
  async getBlock(
    @Param('id', ParseBlockIdPipe) id: BlockNumber,
  ): Promise<BlockTransactionString> {
    return this.web3Service.getBlock(id);
  }
}
