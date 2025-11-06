import { Body, Controller, Get, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import type { Game, GameDetailsDTO, GameIndexDTO } from '../interfaces/game.class';
import { ApiResponse } from 'src/interfaces/api.interface';
import * as ApiUtils from 'src/utils/api.utils';
import { SocketId } from 'src/utils/decorators.utils';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  async getGames(): Promise<ApiResponse<GameIndexDTO[]>> {
    return ApiUtils.createApiResponse(this.lobbyService.getGames(), 'Games retrieved successfully');
  }

  @Post('create')
  async createGame(@Body('gameName') gameName: string, @SocketId() socketId?: string): Promise<ApiResponse<GameIndexDTO>> {
    return ApiUtils.createApiResponse(this.lobbyService.createGame(gameName, socketId!), 'Game created successfully');
  }

  @Post('join')
  async joinGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number, @SocketId() socketId?: string): Promise<ApiResponse<GameDetailsDTO>> {
    return ApiUtils.createApiResponse(this.lobbyService.joinGame(playerId, gameId, socketId!), 'Game joined successfully');
  }

  @Post('quit')
  async quitGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number, @SocketId() socketId?: string): Promise<ApiResponse<void>> {
    return ApiUtils.createApiResponse(this.lobbyService.quitGame(playerId, gameId, socketId!), 'Game quit successfully');
  }

}
