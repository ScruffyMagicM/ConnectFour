import { Injectable } from "@nestjs/common";
import { LobbyGateway } from "src/websocket/lobby.gateway";
import { GameGateway } from "src/websocket/game.gateway";

@Injectable()
export class BroadcastService {
  constructor(
    private readonly gameGateway: GameGateway,
    private readonly lobbyGateway: LobbyGateway
  ) {}

  joinRoom(socketId: string, gameId: string)
  {
      const socket = this.gameGateway.server.sockets.sockets.get(socketId);
      if (socket) {
        socket.join(`${gameId}`);
      }
  }

  leaveRoom(socketId: string, gameId: string)
  {
      const socket = this.gameGateway.server.sockets.sockets.get(socketId);
      if (socket) {
        socket.leave(`${gameId}`);
      }
  }

  emitToOthers(
    gateway: 'lobby' | 'game',
    event: string,
    data: any,
    excludeSocketId?: string
  ) {
    const gatewayMap = {
      lobby: this.lobbyGateway,
      game: this.gameGateway
    };

    const selectedGateway = gatewayMap[gateway];
    
    if (excludeSocketId) {
      selectedGateway.server.sockets.sockets.forEach((socket) => {
        if (socket.id !== excludeSocketId) {
          socket.emit(event, data);
        }
      });
    } else {
      selectedGateway.server.emit(event, data);
    }
  }

  emitToOthersRoom(
    gateway: 'lobby' | 'game',
    roomId: string,
    event: string,
    data: any,
    excludeSocketId?: string
  ) {
    const gatewayMap = {
      lobby: this.lobbyGateway,
      game: this.gameGateway
    };

    const selectedGateway = gatewayMap[gateway];
    
    if (excludeSocketId) {
      selectedGateway.server.to(roomId).except(excludeSocketId).emit(event, data);
    } else {
      selectedGateway.server.emit(event, data);
    }
  }
}