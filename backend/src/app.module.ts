import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'board-postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'board-postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
