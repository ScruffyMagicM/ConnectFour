import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { MessageBody } from '@nestjs/websockets';
import type { GameStateDTO } from 'src/interfaces/game.class';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async GetGame(@MessageBody() gameId: number): Promise<GameStateDTO> {
    return await this.gameService.JoinGame(gameId);
  }

  @Post('updateGameState')
  async UpdateGameState(@MessageBody() gameId: number, move: number, playerId: number): Promise<number> {
    return await this.gameService.UpdateGameState(gameId, move, playerId);
  }

  @Post('quitGame')
  async QuitGame(@MessageBody() gameId: number, playerId: number): Promise<void> {
    return await this.gameService.QuitGame(gameId, playerId);
  }
}
