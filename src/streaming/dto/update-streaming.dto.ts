import { PartialType } from '@nestjs/swagger';
import { CreateStreamingDto } from './create-streaming.dto';

export class UpdateStreamingDto extends PartialType(CreateStreamingDto) {}
