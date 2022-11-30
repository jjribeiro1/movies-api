import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments) {
    const model = args.constraints[0];
    const property = args.property;

    if (!value || !model || ![property]) {
      return false;
    }

    const findRecord = await this.prisma[model].findUnique({
      where: { [property]: value },
    });
    if (findRecord) {
      return false;
    }

    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be unique`;
  }
}
export function IsUnique(model: string, options?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      async: true,
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model],
      options: options,
      validator: IsUniqueConstraint,
    });
  };
}
