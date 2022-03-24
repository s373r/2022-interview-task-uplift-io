import {
  CacheInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOkResponse({
    description: 'The requested index is returned',
  })
  @ApiBadRequestResponse({
    description: '"id" is not a number',
  })
  @ApiNotFoundResponse({
    description: 'The requested index is not found',
  })
  @ApiParam({
    name: 'id',
    // NOTE: To unlock the last example in Swagger UI
    type: '',
    examples: {
      'Get an index': {
        value: 1,
      },
      'Try to get a non-existent index': {
        value: 42,
      },
      'Try to use an invalid index ID': {
        value: 'foobar',
      },
    },
  })
  async getIndex(@Param('id', ParseIntPipe) id: number): Promise<Index> {
    const index = await this.web3Service.getIndex(id);

    if (isNil(index)) {
      throw new NotFoundException();
    }

    return index;
  }
}
