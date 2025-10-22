import { apiClient } from '../utils/apiClient';
import { ApiResponse } from '../types/api.types';
import { GameIndexDTO, GameStateDTO } from '../types/game.types';

export class LobbyAPIService {
  private readonly basePath = '/lobby';

    async getGames(): Promise<ApiResponse<GameIndexDTO[]>> {
        return apiClient.get<GameIndexDTO[]>(`${this.basePath}`);
    }

    async createGame(gameName: string): Promise<ApiResponse<GameIndexDTO>> {
        return apiClient.post<GameIndexDTO>(`${this.basePath}/create`, {
            gameName,
        });
    }

    async joinGame(playerId: number, gameId: number): Promise<ApiResponse<GameStateDTO>> {
        return apiClient.post<GameStateDTO>(`${this.basePath}/join`, {
            playerId,
            gameId,
        });
    }

    async quitGame(playerId: number, gameId: number): Promise<ApiResponse<void>> {
        return apiClient.post<void>(`${this.basePath}/quit`, {
            playerId,
            gameId,
        });
    }
}

export const lobbyApiService = new LobbyAPIService();