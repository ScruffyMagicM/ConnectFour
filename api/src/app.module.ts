import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './interfaces/game.class';
import { GameModule } from './game/game.module';
import { LobbyModule } from './lobby/lobby.module';
import { BroadcastService } from './websocket/broadcast.service';
import { WebSocketModule } from './websocket/broadcast.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Stuyvesant1',
      database: 'ConnectFour',
      entities: [Game],
      synchronize: true
    }),
    GameModule,
    LobbyModule,
    WebSocketModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
