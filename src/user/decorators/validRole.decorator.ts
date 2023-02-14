import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsValidRole(property: string[]) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsRoleValid',
      target: object.constructor,
      constraints: property,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (args.property !== 'role' || typeof value !== 'string') {
            return false;
          }
          const [admin, user] = args.constraints;

          return value === admin || value === user ? true : false;
        },
        defaultMessage() {
          return `propriedade '${propertyName}' deve ser ${property[0]} ou ${property[1]}`;
        },
      },
    });
  };
}
