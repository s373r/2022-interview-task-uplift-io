import { Module } from '@nestjs/common';

import { BlocksController } from './blocks.controller';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module],
  controllers: [BlocksController],
})
export class BlocksModule {}
