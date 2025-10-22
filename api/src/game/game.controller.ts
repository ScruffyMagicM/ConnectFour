import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { MessageBody } from '@nestjs/websockets';
import { Param } from '@nestjs/common';
import type { GameStateDTO } from 'src/interfaces/game.class';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':gameId')
  async GetGame(@Param('gameId') gameId: number): Promise<GameStateDTO> {
    return this.gameService.JoinGame(gameId);
  }

  @Post('updateGameState')
  async UpdateGameState(@MessageBody() gameId: number, move: number, playerId: number): Promise<number> {
    return this.gameService.UpdateGameState(gameId, move, playerId);
  }

  @Post('quitGame')
  async QuitGame(@MessageBody() gameId: number, playerId: number): Promise<void> {
    return this.gameService.QuitGame(gameId, playerId);
  }
}
