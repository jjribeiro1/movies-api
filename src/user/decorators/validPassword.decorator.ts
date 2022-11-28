import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsValidPassword() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          const targetProperty = args.property === 'password';
          const passwordArray = value.split('');
          const passwordMinLength = value.length >= 8;
          const specialCharacterInPassword = passwordArray.some((value) => {
            return (
              value === '!' ||
              value === '@' ||
              value === '#' ||
              value === '$' ||
              value === '%'
            );
          });
          const numberInPassword = passwordArray.some((value) => Number(value));
          return (
            targetProperty &&
            passwordMinLength &&
            specialCharacterInPassword &&
            numberInPassword
          );
        },
        defaultMessage() {
          return 'password must have at least 8 characters, at least one special character(!, @, #, $, %) and a number';
        },
      },
    });
  };
}
