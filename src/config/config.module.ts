import Joi from 'joi';
import { ConfigModule as ConfigModuleClass } from '@nestjs/config';

import ConfigVariable from './ConfigVariable';

const validationSchema = Joi.object({
  [ConfigVariable.PORT]: Joi.number().default(3000),
  [ConfigVariable.WEB3_HTTP_ENDPOINT]: Joi.string().uri().required(),
});

const ConfigModule = ConfigModuleClass.forRoot({
  validationSchema,
  cache: true,
  isGlobal: true,
});

export { ConfigModule };
