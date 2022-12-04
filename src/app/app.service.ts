import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Status(): string {
    return `Server is running, check: "localhost:3000/api" for documentation`;
  }
}
