import { useState } from 'react';
import { GameStateDTO, GameStatus } from '../types/game.types';

//Need to reconcile game state here with what we're actually passing from the API/Websockets

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameStateDTO | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);

  return {
    gameState,
    setGameState,
    currentPlayer,
    setCurrentPlayer,
    roomId,
    setRoomId,
  };
};