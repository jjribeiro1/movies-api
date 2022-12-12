import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionsType } from './newException';

interface Exception {
  exceptionType: ExceptionsType;
  message?: string;
}

export function handleException({ exceptionType, message }: Exception) {
  if (exceptionType === ExceptionsType.DATABASE) {
    throw new InternalServerErrorException(
      message ? message : 'Unexpected Database Error',
    );
  }

  if (
    exceptionType === ExceptionsType.NOTFOUND ||
    exceptionType === ExceptionsType.INVALIDDATA
  ) {
    throw new BadRequestException(message ? message : 'Invalid Data');
  }

  if (exceptionType === ExceptionsType.UNAUTHORIZED) {
    throw new UnauthorizedException(message ? message : 'Unauthorized');
  }
}
