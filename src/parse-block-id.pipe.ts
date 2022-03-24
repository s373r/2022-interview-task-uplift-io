import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { BlockNumber } from './web3/web3.service';

@Injectable()
export class ParseBlockIdPipe implements PipeTransform<string> {
  transform(value: string): BlockNumber {
    if (value === 'latest') {
      return value;
    }

    const convertedValue = +value;
    const isInteger = Number.isInteger(convertedValue);

    if (!isInteger) {
      throw new BadRequestException(
        'Validation failed (integer or "latest" string is expected)',
      );
    }

    return convertedValue;
  }
}
