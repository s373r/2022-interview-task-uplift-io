import { Controller, Get, Redirect } from '@nestjs/common';

import { ApiGroup } from './common';

@Controller()
export class AppController {
  @Get()
  @Redirect(ApiGroup.DOCUMENTATION)
  redirect() {}
}
