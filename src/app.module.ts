import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksModule } from './blocks/blocks.module';
import { GroupsModule } from './groups/groups.module';
import { IndexesModule } from './indexes/indexes.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BlocksModule, IndexesModule, GroupsModule],
})
export class AppModule {}
