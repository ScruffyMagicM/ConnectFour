import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { MessageBody } from '@nestjs/websockets';
import { Param } from '@nestjs/common';
import type { GameStateDTO } from 'src/interfaces/game.class';
import { ApiResponse } from 'src/interfaces/api.interface';
import * as ApiUtils from 'src/utils/api.utils';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':gameId')
  async GetGame(@Param('gameId') gameId: number): Promise<ApiResponse<GameStateDTO>> {
    return ApiUtils.createApiResponse(this.gameService.JoinGame(gameId), 'Game retrieved successfully');
  }

  @Post('updateGameState')
  async UpdateGameState(@MessageBody() gameId: number, move: number, playerId: number): Promise<ApiResponse<number>> {
    return ApiUtils.createApiResponse(this.gameService.UpdateGameState(gameId, move, playerId), 'Game state updated successfully');
  }

  @Post('quitGame')
  async QuitGame(@MessageBody() gameId: number, playerId: number): Promise<ApiResponse<void>> {
    return ApiUtils.createApiResponse(this.gameService.QuitGame(gameId, playerId), 'Quit game successfully');
  }
}
