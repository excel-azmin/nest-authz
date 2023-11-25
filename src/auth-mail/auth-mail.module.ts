import { Module } from '@nestjs/common';
import { AuthMailService } from './auth-mail.service';
import { AuthMailController } from './auth-mail.controller';

@Module({
  controllers: [AuthMailController],
  providers: [AuthMailService],
})
export class AuthMailModule {}
