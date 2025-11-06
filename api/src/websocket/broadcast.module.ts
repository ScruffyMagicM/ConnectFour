import { Module, Global } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { GameGateway } from 'src/websocket/game.gateway';
import { LobbyGateway } from 'src/websocket/lobby.gateway';

@Global() // Makes it available everywhere without importing
@Module({
  providers: [GameGateway, LobbyGateway, BroadcastService],
  exports: [BroadcastService], // Export all
})
export class WebSocketModule {}