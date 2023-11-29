import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.SERVER_HOST,
      port: +process.env.PORT,
      entities: [User],
      database: process.env.DATABASE,
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', './client/build'),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
