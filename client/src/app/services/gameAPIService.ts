import { apiClient } from '../utils/apiClient';
import { ApiResponse } from '../types/api.types';
import { GameStateDTO } from '../types/game.types';

export class GameService {
  private readonly basePath = '/games';

    async getGame(gameId: number): Promise<ApiResponse<GameStateDTO>> {
        return apiClient.get<GameStateDTO>(`${this.basePath}/${gameId}`);
    }

    async updateGameState(gameId: number, move: number, playerId: number): Promise<ApiResponse<number>> {
    return apiClient.post<number>(`${this.basePath}/updateGameState`, {
        gameId, 
        move,
        playerId,
        });
    }

    async quitGame(gameId: number, playerId: number): Promise<ApiResponse<number>> {
      return apiClient.post<number>(`${this.basePath}/${gameId}/quitGame`, {
        playerId,
      });
    }
}

export const gameApiService = new GameService();