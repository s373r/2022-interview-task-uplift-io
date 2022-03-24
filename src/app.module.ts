import { CacheModule, Module } from '@nestjs/common';

import { BlocksModule } from './blocks/blocks.module';
import { ConfigModule } from './config/config.module';
import { GroupsModule } from './groups/groups.module';
import { IndexesModule } from './indexes/indexes.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule,
    BlocksModule,
    IndexesModule,
    GroupsModule,
  ],
})
export class AppModule {}
