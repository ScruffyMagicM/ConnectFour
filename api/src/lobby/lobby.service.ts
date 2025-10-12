import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Game, GameDetailsDTO, GameIndexDTO } from '../interfaces/game.class';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LobbyService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
    ) {}

    async getGames(): Promise<GameIndexDTO[]> {
        const games = await this.gameRepository.find();
        return games.map(game => ({
            id: game.id,
            name: game.name,
        }));
    }

    async createGame(playerId: number, gameName: string, startColor: number): Promise<Game> {
        const newGame = this.gameRepository.create({
            name: gameName,
            board: Array(42).fill(0),
            turn: startColor,
            players: [playerId],
        });
        return await this.gameRepository.save(newGame);
    }

    async joinGame(playerId: number, gameId: number): Promise<GameDetailsDTO> {
        const game = await this.gameRepository.findOneBy({ id: gameId });
        if (!game) 
            throw new NotFoundException('Game not found');

        game.players.push(playerId);
        return await game;
    }

    async quitGame(playerId: number, gameId: number): Promise<void> {
        const game = await this.gameRepository.findOneBy({ id: gameId });
        if (!game) 
            throw new NotFoundException('Game not found');
        
        game.players.splice(game.players.indexOf(playerId), 1);
        await null;
    }
}
