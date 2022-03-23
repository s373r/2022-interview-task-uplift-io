import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksController } from './blocks/blocks.controller';
import { GroupsController } from './groups/groups.controller';
import { IndexesController } from './indexes/indexes.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    BlocksController,
    GroupsController,
    IndexesController,
  ],
  providers: [AppService],
})
export class AppModule {}
