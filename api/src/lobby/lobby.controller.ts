import { Body, Controller, Get, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import type { Game, GameDetailsDTO, GameIndexDTO } from '../interfaces/game.class';

@Controller()
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  async getGames(): Promise<GameIndexDTO[]> {
    return await this.lobbyService.getGames();
  }

  @Post('create')
  async createGame(@Body('playerId') playerId: number, @Body('gameName') gameName: string, @Body('startColor') startColor: number): Promise<Game> {
    return await this.lobbyService.createGame(playerId, gameName, startColor);
  }

  @Post('join')
  async joinGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number): Promise<GameDetailsDTO> {
    return await this.lobbyService.joinGame(playerId, gameId);
  }

  @Post('quit')
  async quitGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number): Promise<void> {
    return await this.lobbyService.quitGame(playerId, gameId);
  }
}
