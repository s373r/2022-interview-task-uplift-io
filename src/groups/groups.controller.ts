import {
  Controller,
  Get,
  NotImplementedException,
  Param,
} from '@nestjs/common';

import { GroupIds } from '../web3/contracs/blockchainIndexesContract';
import { Web3Service } from '../web3/web3.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly web3Service: Web3Service) {}

  @Get()
  async getGroupIds(): Promise<GroupIds> {
    return this.web3Service.getGroupIds();
  }

  @Get(':id')
  getGroup(@Param('id') _id: string): void {
    throw new NotImplementedException();
  }
}
