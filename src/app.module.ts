import { Module } from '@nestjs/common';

import { BlocksModule } from './blocks/blocks.module';
import { ConfigModule } from './config/config.module';
import { GroupsModule } from './groups/groups.module';
import { IndexesModule } from './indexes/indexes.module';

@Module({
  imports: [ConfigModule, BlocksModule, IndexesModule, GroupsModule],
})
export class AppModule {}
