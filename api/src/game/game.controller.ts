import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { MessageBody } from '@nestjs/websockets';
import { Param } from '@nestjs/common';
import type { GameDetailsDTO, GameStateDTO } from 'src/interfaces/game.class';
import { ApiResponse } from 'src/interfaces/api.interface';
import * as ApiUtils from 'src/utils/api.utils';
import { QuitGameDTO, UpdateGameStateDTO } from 'src/interfaces/dtos.class';
import { BroadcastService } from 'src/websocket/broadcast.service';
import { SocketId } from 'src/utils/decorators.utils';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':gameId')
  async GetGame(@Param('gameId') gameId: number, @SocketId() socketId?: string): Promise<ApiResponse<GameStateDTO>> {
    const result = ApiUtils.createApiResponse(this.gameService.GetGame(gameId, socketId!), 'Game retrieved successfully');
    return result;
  }

  @Post('join')
    async joinGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number, @SocketId() socketId?: string): Promise<ApiResponse<GameDetailsDTO>> {
      return ApiUtils.createApiResponse(this.gameService.JoinGame(playerId, gameId, socketId!), 'Game joined successfully');
  }

  @Post('updateGameState')
  async UpdateGameState(@MessageBody() updateGameStateDTO: UpdateGameStateDTO, @SocketId() socketId?: string): Promise<ApiResponse<number>> {
    return ApiUtils.createApiResponse(this.gameService.UpdateGameState(updateGameStateDTO.gameId, updateGameStateDTO.move, updateGameStateDTO.playerId, socketId!), 'Game state updated successfully');
  }

  @Post('quitGame')
  async QuitGame(@MessageBody() quitGameDTO: QuitGameDTO, @SocketId() socketId?: string): Promise<ApiResponse<void>> {
    return ApiUtils.createApiResponse(this.gameService.QuitGame(quitGameDTO.gameId, quitGameDTO.playerId, socketId!), 'Quit game successfully');
  }
}
