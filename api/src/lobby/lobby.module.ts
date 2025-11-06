import { Module } from '@nestjs/common';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../interfaces/game.class';
import { WebSocketModule } from 'src/websocket/broadcast.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [LobbyController],
  providers: [LobbyService],
  exports: [LobbyService],
})
export class LobbyModule {}