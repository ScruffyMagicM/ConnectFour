'use client';

import React, { useCallback } from 'react';
import { useAppState } from '../hooks/useAppState';
import Lobby from './lobby';
import Board from './board';
import { useSocketConnection } from '../hooks/useSocketConnection';

export default function ConnectFour() {
  const {
    gameStatus,
    setGameStatus,
    message,
    setMessage,
    roomId,
    setRoomId,
    currentPlayer,
    setCurrentPlayer,
    setJustQuitGame
  } = useAppState();

  const { socket, isConnected } = useSocketConnection();

  const joinGame = (gameId: number | null, playerId: number | null) => {
    // Switch from Lobby to Board
    setGameStatus('playing');
    setRoomId(gameId);
    setCurrentPlayer(playerId);
  };

  const quitGame = (gameId: number | null, playerId: number | null) => {
    // Switch from Board to Lobby
    setJustQuitGame(true);
    setGameStatus('lobby');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Connect Four Multiplayer
        </h1>

        <h2>
          {message}
        </h2>

        {gameStatus === 'lobby' && (
          <Lobby enterGame={joinGame} setMessage={setMessage} socket={socket} />
        )}

        {(gameStatus === 'playing') && (
          <Board gameId={roomId} playerId={currentPlayer} setMessage={setMessage} leaveGame={quitGame} socket={socket} />
        )}

      </div>
    </div>
  );
}