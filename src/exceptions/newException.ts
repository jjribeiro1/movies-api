export enum ExceptionsType {
  DATABASE,
  NOTFOUND,
  INVALIDDATA,
}

export class Exception {
  constructor(
    readonly exceptionType: ExceptionsType,
    readonly message?: string,
  ) {}
}
