import { BadRequestException } from '@nestjs/common';
import { ExceptionsType } from './newException';

interface Exception {
  exceptionType: ExceptionsType;
  message?: string;
}

export function handleException({ exceptionType, message }: Exception) {
  if (exceptionType === ExceptionsType.DATABASE) {
    throw new BadRequestException(message ? message : 'Database Error');
  }
}
