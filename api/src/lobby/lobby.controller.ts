import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import type { Game, GameDetailsDTO, GameIndexDTO } from '../interfaces/game.class';
import { ApiResponse } from 'src/interfaces/api.interface';
import * as ApiUtils from 'src/utils/api.utils';
import { SocketId } from 'src/utils/decorators.utils';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  async GetGames(): Promise<ApiResponse<GameIndexDTO[]>> {
    return ApiUtils.createApiResponse(this.lobbyService.GetGames(), 'Games retrieved successfully');
  }

  @Get('getGame/:gameId')
  async GetGame(@Param('gameId') gameId: number): Promise<ApiResponse<GameDetailsDTO>> {
    return ApiUtils.createApiResponse(this.lobbyService.GetGame(gameId), 'Retrieved game successfully');
  }

  @Post('create')
  async CreateGame(@Body('gameName') gameName: string, @SocketId() socketId?: string): Promise<ApiResponse<GameIndexDTO>> {
    return ApiUtils.createApiResponse(this.lobbyService.CreateGame(gameName, socketId!), 'Game created successfully');
  }

  @Post('quit')
  async QuitGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number, @SocketId() socketId?: string): Promise<ApiResponse<void>> {
    return ApiUtils.createApiResponse(this.lobbyService.QuitGame(playerId, gameId, socketId!), 'Game quit successfully');
  }

}
