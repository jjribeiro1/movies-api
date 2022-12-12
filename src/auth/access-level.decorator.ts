import { SetMetadata } from '@nestjs/common';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const ROLES_KEY = 'roles';
export const AccessLevel = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
