import {
  Controller,
  Get,
  NotImplementedException,
  Param,
} from '@nestjs/common';

@Controller('blocks')
export class BlocksController {
  @Get(':id')
  getBlock(@Param('id') _id: string): void {
    throw new NotImplementedException();
  }
}
