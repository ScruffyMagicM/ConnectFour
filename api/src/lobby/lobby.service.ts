import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Game, GameDetailsDTO, GameIndexDTO } from '../interfaces/game.class';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BroadcastService } from 'src/websocket/broadcast.service';

@Injectable()
export class LobbyService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        private readonly broadcastService: BroadcastService,
    ) {}

    async GetGames(): Promise<GameIndexDTO[]> {
        const games = await this.gameRepository.find({where: { completed: false }});
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
        this.broadcastService.emitToOthers('lobby', 'gameCreated', { gameId: newGame.id, roomName: newGame.name }, socketId);
        return { id: newGame.id, name: newGame.name, players: newGame.players.length };
    }

    async GetGame(gameId: number): Promise<GameDetailsDTO> {
        const game = await this.gameRepository.findOneBy({ id: gameId });
        if (!game) 
            throw new NotFoundException('Game not found');
        
        return game;
    }

    async QuitGame(playerId: number, gameId: number, socketId: string): Promise<void> {
        const game = await this.gameRepository.findOneBy({ id: gameId });
        if (!game) 
            throw new NotFoundException('Game not found');
        
        game.players.splice(game.players.indexOf(playerId), 1);

        this.broadcastService.emitToOthers('lobby', 'playerQuit', { gameId: game.id }, socketId);
    }
}
