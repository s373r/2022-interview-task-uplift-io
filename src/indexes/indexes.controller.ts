import {
  Controller,
  Get,
  NotImplementedException,
  Param,
} from '@nestjs/common';

@Controller('indexes')
export class IndexesController {
  @Get(':id')
  getIndex(@Param('id') _id: string): void {
    throw new NotImplementedException();
  }
}
