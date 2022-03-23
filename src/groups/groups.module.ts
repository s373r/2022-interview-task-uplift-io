import { Module } from '@nestjs/common';

import { GroupsController } from './groups.controller';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module],
  controllers: [GroupsController],
})
export class GroupsModule {}
