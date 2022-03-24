import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/common';

import { GroupsController } from './groups.controller';
import { Web3Module } from '../web3/web3.module';
import { ConfigModule } from '../config/config.module';

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(), ConfigModule, Web3Module],
      controllers: [GroupsController],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
