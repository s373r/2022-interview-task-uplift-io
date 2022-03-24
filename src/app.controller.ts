import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { ApiGroup } from './common';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  @Redirect(ApiGroup.DOCUMENTATION)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  redirect(): void {}
}
