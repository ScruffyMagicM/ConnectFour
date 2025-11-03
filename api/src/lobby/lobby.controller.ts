import { Body, Controller, Get, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import type { Game, GameDetailsDTO, GameIndexDTO } from '../interfaces/game.class';
import { ApiResponse } from 'src/interfaces/api.interface';
import * as ApiUtils from 'src/utils/api.utils';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  async getGames(): Promise<ApiResponse<GameIndexDTO[]>> {
    return ApiUtils.createApiResponse(this.lobbyService.getGames(), 'Games retrieved successfully');
  }

  @Post('create')
  async createGame(@Body('gameName') gameName: string): Promise<ApiResponse<GameIndexDTO>> {
    return ApiUtils.createApiResponse(this.lobbyService.createGame(gameName), 'Game created successfully');
  }

  @Post('join')
  async joinGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number): Promise<ApiResponse<GameDetailsDTO>> {
    return ApiUtils.createApiResponse(this.lobbyService.joinGame(playerId, gameId), 'Game joined successfully');
  }

  @Post('quit')
  async quitGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number): Promise<ApiResponse<void>> {
    return ApiUtils.createApiResponse(this.lobbyService.quitGame(playerId, gameId), 'Game quit successfully');
  }

}
