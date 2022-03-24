import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { BlocksController } from './blocks.controller';
import { ConfigModule } from '../config/config.module';
import { Web3Module } from '../web3/web3.module';

describe('BlocksController', () => {
  let controller: BlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(), ConfigModule, Web3Module],
      controllers: [BlocksController],
    }).compile();

    controller = module.get<BlocksController>(BlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
