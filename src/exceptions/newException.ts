export enum ExceptionsType {
  DATABASE,
}

export class Exception {
  constructor(
    readonly exceptionType: ExceptionsType,
    readonly message?: string,
  ) {}
}
