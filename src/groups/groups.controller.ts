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
import { Group, GroupIds } from '../web3/contracs/blockchainIndexesContract';
import { Web3Service } from '../web3/web3.service';

@ApiTags(ApiGroup.GROUPS)
@Controller(ApiGroup.GROUPS)
@UseInterceptors(CacheInterceptor)
export class GroupsController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Group IDs are returned',
  })
  async getGroupIds(): Promise<GroupIds> {
    return this.web3Service.getGroupIds();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The requested group is returned',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '"id" is not a number',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The requested group is not found',
  })
  async getGroup(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    const group = await this.web3Service.getGroup(id);

    if (isNil(group)) {
      throw new NotFoundException();
    }

    return group;
  }
}
