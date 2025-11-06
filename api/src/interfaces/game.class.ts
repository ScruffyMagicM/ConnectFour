import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('jsonb', { nullable: true, default: [] })
  board: number[];

  @Column()
  turn: number;

  @Column()
  completed: boolean;

  @Column('jsonb', { nullable: true, default: [] })
  players: number[] = [];
}

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
}

export interface GameStateDTO {
  board: number[];
  lastMove: number;
  turn: number;
}