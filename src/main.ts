import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigService, ConfigVariable } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<AppConfigService>(ConfigService);
  const port = configService.get(ConfigVariable.PORT, { infer: true });

  await app.listen(port);
}

bootstrap();
