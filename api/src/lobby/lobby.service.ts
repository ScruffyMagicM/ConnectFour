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

    async GetGames(): Promise<GameIndexDTO[]> {
        const games = await this.gameRepository.find();
        return games.map(game => ({
            id: game.id,
            name: game.name,
            players: game.players.length,
        }));
    }

    async CreateGame(gameName: string, socketId: string): Promise<GameIndexDTO> {
        const newGame = this.gameRepository.create({
            name: gameName,
            board: Array(42).fill(0),
            turn: 1,
            players: [],
            completed: false,
        });
        await this.gameRepository.save(newGame);
        return { id: newGame.id, name: newGame.name, players: newGame.players.length };
    }

    async GetGame(gameId: number): Promise<GameDetailsDTO> {
        const game = await this.gameRepository.findOneBy({ id: gameId });
        if (!game) 
            throw new NotFoundException('Game not found');

        return await game;
    }

    async QuitGame(playerId: number, gameId: number, socketId: string): Promise<void> {
        const game = await this.gameRepository.findOneBy({ id: gameId });
        if (!game) 
            throw new NotFoundException('Game not found');
        
        game.players.splice(game.players.indexOf(playerId), 1);
        await null;
    }
}
