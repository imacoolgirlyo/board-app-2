import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.name,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
