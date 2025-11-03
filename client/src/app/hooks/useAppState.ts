import { GameStatus } from "../types/game.types";
import { useState } from 'react';

export const useAppState = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('lobby');
  const [roomId, setRoomId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [justQuitGame, setJustQuitGame] = useState<boolean>(false);

  return {
    gameStatus,
    setGameStatus,
    message,
    setMessage,
    roomId,
    setRoomId,
    currentPlayer,
    setCurrentPlayer,
    justQuitGame,
    setJustQuitGame,
  };
};