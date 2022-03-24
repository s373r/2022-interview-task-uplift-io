import {
  CacheInterceptor,
  Controller,
  Get,
  NotFoundException,
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
import { isNil } from 'lodash';
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
    examples: {
      'Get a block by ID (as a number)': {
        value: 100500,
      },
      'Get the latest block': {
        value: 'latest',
      },
      'Try to get a non-existent block': {
        value: 100000000000000000,
      },
      'Try to use an invalid block ID': {
        value: 'foobar',
      },
    },
    // TODO: The following schema does not work (in UI) -- figure out why
    schema: {
      oneOf: [{ type: 'string', enum: ['latest'] }, { type: 'integer' }],
    },
  })
  async getBlock(
    @Param('id', ParseBlockIdPipe) id: BlockNumber,
  ): Promise<BlockTransactionString> {
    const block = await this.web3Service.getBlock(id);

    if (isNil(block)) {
      throw new NotFoundException();
    }

    return block;
  }
}
