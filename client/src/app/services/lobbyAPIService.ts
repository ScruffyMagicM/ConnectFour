import { apiClient } from '../utils/apiClient';
import { ApiResponse } from '../types/api.types';
import { GameIndexDTO, GameStateDTO } from '../types/game.types';

export class LobbyAPIService {
  private readonly basePath = '/lobby';

    async getGames(socketId: string): Promise<ApiResponse<GameIndexDTO[]>> {
        return apiClient.get<GameIndexDTO[]>(`${this.basePath}`, socketId);
    }

    async getGame(gameId: number): Promise<ApiResponse<GameStateDTO>> {
        return apiClient.get<GameStateDTO>(`${this.basePath}/getGame/${gameId}`, '');
    }

    async createGame(gameName: string, socketId: string): Promise<ApiResponse<GameIndexDTO>> {
        return apiClient.post<GameIndexDTO>(`${this.basePath}/create`, socketId, {
            gameName,
        });
    }

    async quitGame(playerId: number, gameId: number, socketId: string): Promise<ApiResponse<void>> {
        return apiClient.post<void>(`${this.basePath}/quit`, socketId, {
            playerId,
            gameId,
        });
    }
}

export const lobbyApiService = new LobbyAPIService();