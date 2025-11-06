import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface LobbySocketCallbacks {
  onGameCreated: (data: { roomName: string; gameId: number }) => void;
  onPlayerJoined: (data: { gameId: number; playerId: number }) => void;
  onPlayerQuit: (data: { gameId: number; playerId: number }) => void;
}

export const useLobbySocket = (socket: Socket | null, callbacks: LobbySocketCallbacks) => {

  useEffect(() => {
    if (!socket) return;

    socket.on('gameCreated', callbacks.onGameCreated);
    socket.on('playerJoined', callbacks.onPlayerJoined);
    socket.on('playerQuit', callbacks.onPlayerQuit);

    return () => {
      socket.off('gameCreated', callbacks.onGameCreated);
      socket.off('playerJoined', callbacks.onPlayerJoined);
      socket.off('playerQuit', callbacks.onPlayerQuit);
    };
  }, [socket, callbacks]);

  const createGame = (name: string) => {
    socket?.emit('gameCreated', { name });
  };

  const joinGame = (roomId: number, playerId: number) => {
    socket?.emit('playerJoined', { roomId: roomId, playerId: playerId });
  };

  const quitGame = (roomId: number, playerId: number) => {
    socket?.emit('playerQuit', { roomId, playerId });
  }

  return { createGame, joinGame, quitGame };
};