import {
  Controller,
  Get,
  NotImplementedException,
  Param,
} from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  @Get()
  getGroupIds(): void {
    throw new NotImplementedException();
  }

  @Get(':id')
  getGroup(@Param('id') _id: string): void {
    throw new NotImplementedException();
  }
}
