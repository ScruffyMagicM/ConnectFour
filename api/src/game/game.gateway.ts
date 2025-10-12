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
import type { GameStateDTO } from '../interfaces/game.class';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Player joined handlers
   @SubscribeMessage('playerJoinedGame')
    handlePlayerJoined(@MessageBody() playerId: number, @ConnectedSocket() client: Socket): number {
      console.log(`Player joined: ${playerId}`);
      return playerId;
    }
  
    broadcastPlayerJoined(playerId: number) {
      this.server.emit('playerJoinedGame', { playerId });
    }

  // Player quit handlers
   @SubscribeMessage('playerQuitGame')
   handlePlayerQuit(@MessageBody() playerId: number, @ConnectedSocket() client: Socket): number {
     console.log(`Player quit: ${playerId}`);
     return playerId;
   }

    broadcastPlayerQuit(playerId: number) {
      this.server.emit('playerQuitGame', { playerId });
    }

  // Game state update handlers
    @SubscribeMessage('gameStateUpdate')
    handleGameStateUpdate(@MessageBody() gameState: GameStateDTO, @ConnectedSocket() client: Socket): GameStateDTO {
      console.log(`Game state updated: ${JSON.stringify(gameState)}`);
      return gameState;
    }

    broadcastGameStateUpdate(id: number, gameState: GameStateDTO) {
      this.server.to(`game-${id}`).emit('gameStateUpdate', { gameState });
    }
}
