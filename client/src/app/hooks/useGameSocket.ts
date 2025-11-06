// Hook specifically for in-game socket events
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { GameStateDTO } from '../types/game.types';

interface GameSocketCallbacks {
    onGameStateUpdate: (data: { game: GameStateDTO }) => void;
    onPlayerJoinedGame: (data: { gameId: number; playerId: number }) => void;
    onPlayerQuitGame: (data: { gameId: number; playerId: number }) => void;
}

export const useGameSocket = (
  socket: Socket | null,
  callbacks: GameSocketCallbacks
) => {
  useEffect(() => {
    if (!socket) return;

    socket.on('gameStateUpdate', callbacks.onGameStateUpdate);
    socket.on('playerJoinedGame', callbacks.onPlayerJoinedGame);
    socket.on('playerQuitGame', callbacks.onPlayerQuitGame);

    return () => {
      socket.off('gameStateUpdate', callbacks.onGameStateUpdate);
      socket.off('playerJoinedGame', callbacks.onPlayerJoinedGame);
      socket.off('playerQuitGame', callbacks.onPlayerQuitGame);
    };
  }, [socket, callbacks]);

  //Rewrite to use REST call, then just have the callbacks after server does full emit?

  const playerJoinedGame = (playerId: number) => {
    socket?.emit('playerJoinedGame', { playerId });
  };

  const playerQuitGame = (playerId: number) => {
    socket?.emit('playerQuitGame', { playerId });
  };

  const updateGameState = (gameState: GameStateDTO) => {
    socket?.emit('gameStateUpdate', { gameState });
  };

  return { playerJoinedGame, playerQuitGame,updateGameState };
};
