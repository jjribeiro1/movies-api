import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Status(baseUrl: string) {
    return {
      status: 'Server is running',
      docs: `${baseUrl}/api`,
    };
  }
}
