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
import { Group, GroupIds } from '../web3/contracs/blockchainIndexesContract';
import { Web3Service } from '../web3/web3.service';

@Controller(ApiGroup.GROUPS)
@UseInterceptors(CacheInterceptor)
export class GroupsController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get()
  async getGroupIds(): Promise<GroupIds> {
    return this.web3Service.getGroupIds();
  }

  @Get(':id')
  async getGroup(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    const group = await this.web3Service.getGroup(id);

    if (isNil(group)) {
      throw new NotFoundException();
    }

    return group;
  }
}
