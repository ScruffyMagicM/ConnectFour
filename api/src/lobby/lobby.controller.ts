import { Body, Controller, Get, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import type { Game, GameDetailsDTO, GameIndexDTO } from '../interfaces/game.class';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  async getGames(): Promise<GameIndexDTO[]> {
    return this.lobbyService.getGames();
  }

  @Post('create')
  async createGame(@Body('gameName') gameName: string): Promise<GameIndexDTO> {
    return this.lobbyService.createGame(gameName);
  }

  @Post('join')
  async joinGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number): Promise<GameDetailsDTO> {
    return this.lobbyService.joinGame(playerId, gameId);
  }

  @Post('quit')
  async quitGame(@Body('playerId') playerId: number, @Body('gameId') gameId: number): Promise<void> {
    return this.lobbyService.quitGame(playerId, gameId);
  }

}
