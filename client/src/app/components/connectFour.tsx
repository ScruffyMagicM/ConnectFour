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

  const joinGame = (gameId: number | null, playerId: number | null) => {
    // Switch from Lobby to Board
    setRoomId(gameId);
    setCurrentPlayer(playerId);
    setGameStatus('playing');
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
        <h2 className="mb-6 text-gray-600">
          {message}
        </h2>

        {gameStatus === 'lobby' && (
          <Lobby enterGame={joinGame} setMessage={setMessage}/>
        )}

        {(gameStatus === 'playing') && (
          <Board gameId={roomId} playerId={currentPlayer} setMessage={setMessage} leaveGame={quitGame} />
        )}

      </div>
    </div>
  );
}