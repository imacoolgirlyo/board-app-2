import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { OpenBankingModule } from './openbanking/openbanking.module';
import { TokenModule } from './token/token.module';

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
      synchronize: true,
    }),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    OpenBankingModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
