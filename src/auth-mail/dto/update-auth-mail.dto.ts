import { PartialType } from '@nestjs/swagger';
import { CreateAuthMailDto } from './create-auth-mail.dto';

export class UpdateAuthMailDto extends PartialType(CreateAuthMailDto) {}
