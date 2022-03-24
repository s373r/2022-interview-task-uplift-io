import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { IndexesController } from './indexes.controller';
import { ConfigModule } from '../config/config.module';
import { Web3Module } from '../web3/web3.module';

describe('IndexesController', () => {
  let controller: IndexesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({ isGlobal: true }),
        ConfigModule,
        Web3Module,
      ],
      controllers: [IndexesController],
    }).compile();

    controller = module.get<IndexesController>(IndexesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
