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
import { Group, GroupIds } from '../web3/contracs/blockchainIndexesContract';
import { Web3Service } from '../web3/web3.service';

@ApiTags(ApiGroup.GROUPS)
@Controller(ApiGroup.GROUPS)
@UseInterceptors(CacheInterceptor)
export class GroupsController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get()
  @ApiOkResponse({
    description: 'Group IDs are returned',
  })
  async getGroupIds(): Promise<GroupIds> {
    return this.web3Service.getGroupIds();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The requested group is returned',
  })
  @ApiBadRequestResponse({
    description: '"id" is not a number',
  })
  @ApiNotFoundResponse({
    description: 'The requested group is not found',
  })
  @ApiParam({
    name: 'id',
    // NOTE: To unlock the last example in Swagger UI
    type: '',
    examples: {
      'Get a group': {
        value: 12,
      },
      'Try to get a non-existent group ': {
        value: 777,
      },
      'Try to use invalid group ID': {
        value: 'foobar',
      },
    },
  })
  async getGroup(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    const group = await this.web3Service.getGroup(id);

    if (isNil(group)) {
      throw new NotFoundException();
    }

    return group;
  }
}
