import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigService, ConfigVariable } from './config';

import packageJson from '../package.json';
import { ApiGroup } from './common';

async function bootstrap(): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addTag(ApiGroup.BLOCKS)
    .addTag(ApiGroup.GROUPS)
    .addTag(ApiGroup.INDEXES)
    .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(ApiGroup.DOCUMENTATION, app, document);

  const configService = app.get<AppConfigService>(ConfigService);
  const port = configService.get(ConfigVariable.PORT, { infer: true });

  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
