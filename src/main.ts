import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigService, ConfigVariable } from './config';

import packageJson from '../package.json';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const configService = app.get<AppConfigService>(ConfigService);
  const port = configService.get(ConfigVariable.PORT, { infer: true });

  // .addTag('blocks')
  // .addTag('indexes')
  // .addTag('groups')

  await app.listen(port);
}

bootstrap();
