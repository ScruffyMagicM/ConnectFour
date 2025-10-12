import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameStateDTO } from 'src/interfaces/game.class';
import { Repository } from 'typeorm/repository/Repository.js';
import { GameGateway } from './game.gateway';

// Needs to maintain board state, player turns, win conditions, etc.

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly gameGateway: GameGateway,
  ) {}

  async JoinGame(id: number): Promise<GameStateDTO> {
    const game = await this.gameRepository.findOneBy({ id: id });
    
    if (!game) throw new Error('Game not found');
    if(game.players.length > 1) throw new Error('Game is full');

    // We assume player joining takes first available player slot, i.e. first player to join will be player 1;
    game.players.push(game.players.length + 1);

    this.gameGateway.broadcastPlayerJoined(game.players.length);
    return await this.GetGameState(game);
  }

  async GetGameState(game: Game): Promise<GameStateDTO> {
    return {
      board: game.board,
      lastMove: game.turn,
      turn: game.turn
    };
  }

  async QuitGame(id: number, playerId: number): Promise<void> {
    const game = await this.gameRepository.findOneBy({ id: id });
    if (!game) throw new Error('Game not found');
    if (!game.players.includes(playerId)) throw new Error('Player not in game');

    game.players.splice(game.players.indexOf(playerId), 1);

    await this.gameRepository.update(id, { players: game.players });
    this.gameGateway.broadcastPlayerQuit(id);
  }

  async UpdateGameState(id: number, move: number, playerId: number): Promise<number> {
    const game = await this.gameRepository.findOneBy({ id: id }); 
    
    if (!game) throw new Error('Game not found');    
    if (game.turn !== playerId) throw new Error('Not your turn');
    if (move < 0 || move >= 42) throw new Error('Invalid move');
    if (game.board[move] !== 0) throw new Error('Cell already occupied');    
    if (move >= 7 && game.board[move - 7] === 0) throw new Error('Invalid move: piece must be placed on top of another piece or at the bottom of the column');
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
      this.gameGateway.broadcastGameStateUpdate(id, { board: game.board, lastMove: move, turn: game.turn });
      return playerId == 1 ? 3 : 4; // Return the winning player
    }

    // Notify players of the updated game state
    this.gameGateway.broadcastGameStateUpdate(id, { board: game.board, lastMove: move, turn: game.turn });

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
