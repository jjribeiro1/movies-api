import { UserEntity } from 'src/user/entities/user.entity';

export class LoginOutPutDto {
  user: UserEntity;
  token: string;
}
