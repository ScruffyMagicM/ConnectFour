import { apiClient } from '../utils/apiClient';
import { ApiResponse } from '../types/api.types';
import { GameStateDTO } from '../types/game.types';

export class GameService {
  private readonly basePath = '/game';

    async getGame(gameId: number, socketId: string): Promise<ApiResponse<GameStateDTO>> {
        return apiClient.get<GameStateDTO>(`${this.basePath}/${gameId}`, socketId);
    }

    async joinGame(playerId: number, gameId: number, socketId: string): Promise<ApiResponse<GameStateDTO>> {
      return apiClient.post<GameStateDTO>(`${this.basePath}/join`, socketId, {
        playerId,
        gameId,
      });
    }

    async updateGameState(gameId: number, move: number, playerId: number, socketId: string): Promise<ApiResponse<number>> {
    return apiClient.post<number>(`${this.basePath}/updateGameState`, socketId, {
        gameId, 
        move,
        playerId,
        });
    }

    async quitGame(gameId: number, playerId: number, socketId: string): Promise<ApiResponse<number>> {
      return apiClient.post<number>(`${this.basePath}/quitGame`, socketId, {
        gameId: gameId,
        playerId: playerId,
      });
    }
}

export const gameApiService = new GameService();