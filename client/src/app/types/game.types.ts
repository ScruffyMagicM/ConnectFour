export interface GameDetailsDTO {
  id: number;
  name: string;
  board: number[];
  turn: number;
  players: number[];
}

export interface GameIndexDTO {
  id: number;
  name: string;
  players: number;
}

export interface GameStateDTO {
  board: number[];
  lastMove: number;
  turn: number;
}

export interface PlayerJoinedDTO {
  playerId: number;
  gameId: number;
}

export type GameStatus = 'lobby' | 'waiting' | 'playing' | 'finished';