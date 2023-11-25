import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMailModule } from './auth-mail/auth-mail.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './common/guard/roles.guard';
import { mail } from './config/mail-config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017, // Ensure the correct MongoDB port is used
      username: 'root',
      password: 'example',
      database: 'authz_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Define entities path
      useUnifiedTopology: true,
      useNewUrlParser: true,
      authSource: 'admin',
      logging: true, // Set to true for logging (optional)
    }),
    MailerModule.forRoot({
      transport: {
        host: mail.host,
        port: mail.port,
        ignoreTLS: true,
        secure: mail.secure,
        auth: {
          user: mail.user,
          pass: mail.pass,
        },
      },
      defaults: {
        from: '"No Reply" info@pixfar.com',
      },
    }),

    AuthModule,
    UsersModule,
    JwtModule,
    AuthMailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
