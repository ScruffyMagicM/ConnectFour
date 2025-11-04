import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Game } from './interfaces/game.class';
import { GameModule } from './game/game.module';
import { LobbyModule } from './lobby/lobby.module';
import { LobbyController } from './lobby/lobby.controller';
import { GameController } from './game/game.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'scruffymagic',
      password: 'Stuyvesant1',
      database: 'ConnectFour',
      entities: [Game],
      synchronize: true
    }),
    GameModule,
    LobbyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
