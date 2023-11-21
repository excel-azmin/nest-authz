import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users/schema/user.schema';


@Module({
  imports: [AuthModule, UsersModule, 
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27011',{dbName: 'authz_db'}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
