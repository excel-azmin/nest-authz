import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './common/constants/constants';
import { RolesGuard } from './common/guard/roles.guard';
import { UsersModule } from './users/users.module';

console.log(parseInt(process.env.DB_PORT));
console.log(jwtConstants.secret);

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

    AuthModule,
    UsersModule,
    JwtModule,
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
