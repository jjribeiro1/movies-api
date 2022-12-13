import { Controller, Get } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Status da aplicação',
  })
  @Get()
  Status(@Req() req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return this.appService.Status(baseUrl);
  }
}
