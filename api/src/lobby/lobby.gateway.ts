import { Server, Socket } from 'socket.io';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import type { GameIndexDTO } from '../interfaces/game.class';
import type { PlayerJoinedDTO } from '../interfaces/player.interface';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class LobbyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('gameCreated')
  handleGameCreated(@MessageBody() id: number, name: string, @ConnectedSocket() client: Socket): GameIndexDTO {
    console.log(`Game created: ${id} - ${name}`);
    return { id, name };
  }

  broadcastGameCreated(gameId: number, update: GameIndexDTO) {
    this.server.emit('gameCreated', { gameId, update });
  }
  
  @SubscribeMessage('playerJoined')
  handlePlayerJoined(@MessageBody() gameId: number, playerId: number, @ConnectedSocket() client: Socket): PlayerJoinedDTO {
    console.log(`Player joined: ${playerId} to game: ${gameId}`);
    return { playerId, gameId };
  }

  broadcastPlayerJoined(gameId: number, update: PlayerJoinedDTO) {
    this.server.emit('playerJoined', { gameId, update });
  }

  @SubscribeMessage('playerQuit')
  handlePlayerQuit(@MessageBody() gameId: number, playerId: number, @ConnectedSocket() client: Socket): PlayerJoinedDTO {
    console.log(`Player quit from game: ${gameId}`);
    return { playerId, gameId };
  }

  broadcastPlayerQuit(gameId: number, update: PlayerJoinedDTO) {
    this.server.emit('playerQuit', { gameId, update });
  }
}