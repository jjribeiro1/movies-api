import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsValidCpf() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidCpf',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (args.property !== 'cpf' || typeof value !== 'string') {
            return false;
          }
          if (value === null) {
            return false;
          }
          if (value.length !== 11) {
            return false;
          }
          if (
            value === '00000000000' ||
            value === '11111111111' ||
            value === '22222222222' ||
            value === '33333333333' ||
            value === '44444444444' ||
            value === '55555555555' ||
            value === '66666666666' ||
            value === '77777777777' ||
            value === '88888888888' ||
            value === '99999999999'
          ) {
            return false;
          }
          let numero = 0;
          let caracter = '';
          const numeros = '0123456789';
          let j = 10;
          let somatorio = 0;
          let resto = 0;
          let digito1 = 0;
          let digito2 = 0;
          let cpfAux = '';
          cpfAux = value.substring(0, 9);
          for (let i = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) == -1) {
              return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + numero * j;
            j--;
          }
          resto = somatorio % 11;
          digito1 = 11 - resto;
          if (digito1 > 9) {
            digito1 = 0;
          }
          j = 11;
          somatorio = 0;
          cpfAux = cpfAux + digito1;
          for (let i = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + numero * j;
            j--;
          }
          resto = somatorio % 11;
          digito2 = 11 - resto;
          if (digito2 > 9) {
            digito2 = 0;
          }
          cpfAux = cpfAux + digito2;
          if (value != cpfAux) {
            return false;
          } else {
            return true;
          }
        },
        defaultMessage() {
          return 'cpf inválido';
        },
      },
    });
  };
}
