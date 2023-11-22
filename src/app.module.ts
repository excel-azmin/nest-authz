import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

console.log(parseInt(process.env.DB_PORT));
console.log(process.env.DB_HOST);

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
