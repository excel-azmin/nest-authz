import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMailController } from './auth-mail.controller';
import { AuthMailService } from './auth-mail.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthMailController],
  providers: [AuthMailService],
})
export class AuthMailModule {}
