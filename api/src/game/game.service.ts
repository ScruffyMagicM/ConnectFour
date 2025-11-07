import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameDetailsDTO, GameStateDTO } from 'src/interfaces/game.class';
import { Repository } from 'typeorm/repository/Repository.js';
import { BroadcastService } from 'src/websocket/broadcast.service';

// Needs to maintain board state, player turns, win conditions, etc.

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly broadcastService: BroadcastService,
  ) {}

  async GetGame(id: number, socketId: string): Promise<GameStateDTO> {
    const game = await this.gameRepository.findOneBy({ id: id });
    
    if (!game) throw new Error('Game not found');
    return await this.GetGameState(game);
  }

  async JoinGame(playerId: number, gameId: number, socketId: string): Promise<GameDetailsDTO> {
      const game = await this.gameRepository.findOneBy({ id: gameId });
        if (!game) 
          throw new NotFoundException('Game not found');
  
    game.players.push(playerId);
    this.gameRepository.update(game.id, {players: game.players});

    this.broadcastService.joinRoom(socketId, `game-${gameId}`);

    return await game;
  }

  async GetGameState(game: Game): Promise<GameStateDTO> {
    return {
      board: game.board,
      lastMove: game.turn,
      turn: game.turn
    };
  }

  async QuitGame(id: number, playerId: number, socketId: string): Promise<void> {
    const game = await this.gameRepository.findOneBy({ id: id });
    if (!game) throw new Error('Game not found');
    if (!game.players.includes(playerId)) throw new Error('Player not in game');

    game.players.splice(game.players.indexOf(playerId), 1);

    await this.gameRepository.update(id, { players: game.players });
    this.broadcastService.emitToOthers('game', 'playerQuitGame', { id : id }, socketId);

    this.broadcastService.joinRoom(socketId, `game-${id}`);
  }

  async UpdateGameState(id: number, move: number, playerId: number, socketId: string): Promise<number> {
    const game = await this.gameRepository.findOneBy({ id: id }); 
    
    if (!game) throw new Error('Game not found');    
    if (game.turn !== playerId) throw new Error('Not your turn');
    if (move < 0 || move >= 42) throw new Error('Invalid move');
    if (game.board[move] !== 0) throw new Error('Cell already occupied');
    if (game.completed) throw new Error('Game already completed');

    // Update the board with the player's move
    game.board[move] = playerId;
    
    // Switch turn to the other player
    game.turn = game.turn === 1 ? 2 : 1;
    
    // Update game state in the database
    await this.gameRepository.update(id, { board: game.board, turn: game.turn });

    // Check for victory conditions
    const result = await this.CheckVictory(game.board, move, playerId);

    if (result) {
      // Handle victory (e.g., notify players, update game status)

      this.broadcastService.emitToOthersRoom('game', `game-${id}`, 'gameStateUpdate', { game: {board: game.board, lastMove: move, turn: game.turn }}, socketId);
      return playerId == 1 ? 3 : 4; // Return the winning player
    }

    // Notify players of the updated game state
    this.broadcastService.emitToOthersRoom('game', `game-${id}`, 'gameStateUpdate', { game: {board: game.board, lastMove: move, turn: game.turn }}, socketId);

    return game.turn;
  }

  async CheckVictory(board: number[], lastMove: number, player: number): Promise<boolean> {
    // Check horizontal, vertical, and diagonal for a connect four
    var count = 1;
    var currElement = lastMove;

    // Check diagonal up-left
    while(currElement % 7 > 0 && Math.floor(currElement / 7) > 0 && board[currElement - 8] === player) {
      count++;
      currElement -= 8;
    }

    currElement = lastMove;

    while(currElement % 7 < 6 && Math.floor(currElement / 7) < 5 && board[currElement + 8] === player) {
      count++;
      currElement += 8;
    }

    if(count >= 4) return true;

    // Check diagonal up-right
    count = 1;
    currElement = lastMove;

    while(currElement % 7 < 6 && Math.floor(currElement / 7) > 0 && board[currElement - 6] === player) {
      count++;
      currElement -= 6;
    }

    currElement = lastMove;

    while(currElement % 7 > 0 && Math.floor(currElement / 7) < 5 && board[currElement + 6] === player) {
      count++;
      currElement += 6;
    } 

    if(count >= 4) return true;

    // Check row
    count = 1;
    currElement = lastMove;

    while(currElement % 7 > 0 && board[currElement - 1] === player) {
      count++;
      currElement -= 1;
    }

    currElement = lastMove;

    while(currElement % 7 < 6 && board[currElement + 1] === player) {
      count++;
      currElement += 1;
    }

    if(count >= 4) return true;
    
    // Check column
    count = 1;
    currElement = lastMove;

    while(Math.floor(currElement / 7) > 0 && board[currElement - 7] === player) {
      count++;
      currElement -= 7;
    }

    currElement = lastMove;
    while(Math.floor(currElement / 7) < 5 && board[currElement + 7] === player) {
      count++;
      currElement += 7;
    }

    if(count >= 4) return true;

    return false;
  }
}
