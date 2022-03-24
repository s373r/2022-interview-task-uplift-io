import { Module } from '@nestjs/common';

import { IndexesController } from './indexes.controller';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module],
  controllers: [IndexesController],
})
export class IndexesModule {}
