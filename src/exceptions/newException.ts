export enum ExceptionsType {
  DATABASE,
  NOTFOUND,
  INVALIDDATA,
  UNAUTHORIZED,
}

export class Exception {
  constructor(
    readonly exceptionType: ExceptionsType,
    readonly message?: string,
  ) {}
}
