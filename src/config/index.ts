import { ConfigService } from '@nestjs/config';

import ConfigVariable from './ConfigVariable';
import ConfigVariables from './ConfigVariables';

type AppConfigService = ConfigService<ConfigVariables, true>;

export { AppConfigService, ConfigVariable, ConfigVariables };
