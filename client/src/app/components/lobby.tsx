"use client";

import React, { useCallback, useState, useEffect } from "react";
import type { GameIndexDTO } from "../types/game.types";
import { lobbyApiService } from "../services/lobbyAPIService";
import { useLobbySocket } from "../hooks/useLobbySocket";
import { Socket } from "socket.io-client";
import { useAppState } from "../hooks/useAppState";
import { useSocketConnection } from "../hooks/useSocketConnection";

export default function Lobby({ enterGame, setMessage }: { enterGame: (gameId: number | null, playerId: number | null) => void, setMessage: (message: string) => void }) {
    const {
        roomId,
        setRoomId,
        currentPlayer,
        setCurrentPlayer,
        justQuitGame,
        setJustQuitGame,
    } = useAppState();

    const [games, setGames] = useState<GameIndexDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const socket = useSocketConnection();

  // Lobby-specific socket events and actions
    const { } = useLobbySocket(socket, {
    onGameCreated: useCallback(({ roomName, gameId }) => {
      //List new game in lobby
      games.push({ id: gameId, name: roomName, players: 0 });
      setMessage(`Game created! Room code: ${roomName}. Waiting for opponent...`);
    }, [setMessage]),
    onPlayerJoined: useCallback(({ gameId, playerId }) => {
      //Update view with 2nd player
      const game = games.find(game => game.id === gameId);
      if (game) {
        game.players += 1;
      }
      setMessage(`Player ${playerId} joined the game.`);
    }, [setMessage]),
    onPlayerQuit: useCallback(({ gameId, playerId }) => {
      //Update view when a player quits
      const game = games.find(game => game.id === gameId);
      if (game) {
        game.players -= 1;
      }
      setMessage(`Player ${playerId} quit the game.`);
    }, [setMessage]),
  });

  const clickJoinGame = (gameId: number) => {
    const game = games.find(game => game.id === gameId);
    if(game === undefined || game.players > 1) return;
    lobbyApiService.getGame(gameId).then(response => {
        if(response.data){
            setMessage(`Joining game ${gameId}!`);
            setCurrentPlayer(game.players + 1);
            setRoomId(gameId);
            socket?.disconnect();
            enterGame(gameId, game.players + 1);
        }
    });
  };

  const makeGame = () => {
    //Open prompt to create game
    const gameName = prompt("Enter a name for your game:");

    if(!gameName && gameName !== ""){
        return;
    }

    const tempName = `Game_${Math.floor(Math.random() * 1000)}`;

    lobbyApiService.createGame(gameName ? gameName : tempName, socket?.id!).then(response => {
        if(response.data){
            setMessage(`Game "${gameName ? gameName : tempName}" created!`);
            games.push(response.data);
            setGames(games);
        }
    });
  };

  useEffect(() => {
    if(justQuitGame === true){
      setJustQuitGame(false);
    }
  }, [justQuitGame]);

  useEffect(() => {  
    console.log("Fetching games list from lobby...");
    lobbyApiService.getGames(socket?.id!).then(response => {
        console.log("Got lobby...");
        const newGames: GameIndexDTO[] = [];
        if(response.data){
            response.data.forEach(game => {
                newGames.push(game);
            });
        }
        setGames(newGames);
        setIsLoading(false);
        console.log("Connecting socket...");
        socket?.connect();
        console.log("Socket connected.");
    });
  }, []);

    return (
        <div className="lobby text-black">
            { !isLoading && 
              <ul className="game-list">
                <GamesList games={ games } joinGame={clickJoinGame} />
              </ul>
            }
            <button className="lobby-button px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => makeGame()}>Create Game</button>
        </div>
    );
}

export function GamesList({ games, joinGame }: { games: GameIndexDTO[], joinGame: (gameId: number) => void }) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center mb-4">
      {/* Header Row */}
      <div className="font-bold">Game Name</div>
      <div className="font-bold">Players</div>
      <div className="font-bold">Action</div>
      
      {/* Game Rows */}
      {games.map(game => (
        <>
          <div key={`${game.id}-name`}>{game.name}</div>
          <div key={`${game.id}-players`}>{game.players ?? 0}/2</div>
          <button 
            key={`${game.id}-button`}
            className="join-button px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600" 
            onClick={() => joinGame(game.id)}
          >
            Join
          </button>
        </>
      ))}
    </div>
  );
}