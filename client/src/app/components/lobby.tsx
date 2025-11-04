"use client";

import React, { useCallback, useState, useEffect } from "react";
import type { GameIndexDTO } from "../types/game.types";
import { lobbyApiService } from "../services/lobbyAPIService";
import { useLobbySocket } from "../hooks/useLobbySocket";
import { Socket } from "socket.io-client";
import { useAppState } from "../hooks/useAppState";

export default function Lobby({ enterGame, setMessage, socket }: { enterGame: (gameId: number | null, playerId: number | null) => void, setMessage: (message: string) => void, socket: Socket | null }) {
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

  // Lobby-specific socket events and actions
    const { createGame, joinGame, quitGame } = useLobbySocket(socket, {
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
    lobbyApiService.joinGame(game.players + 1, gameId).then(response => {
        if(response.data){
            setMessage(`Joined game ${gameId}!`);
            setCurrentPlayer(game.players + 1);
            setRoomId(gameId);
            joinGame(gameId, game.players + 1);
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

    lobbyApiService.createGame(gameName ? gameName : tempName).then(response => {
        if(response.data){
            setMessage(`Game "${gameName ? gameName : tempName}" created!`);
            createGame(gameName ? gameName : tempName);
            games.push(response.data);
            setGames(games);
        }
    });
  };

  useEffect(() => {
    if(justQuitGame === true){
      quitGame(roomId!, currentPlayer!);
      setJustQuitGame(false);
    }
  }, [justQuitGame]);

  useEffect(() => {  
    console.log("Fetching games list from lobby...");
    lobbyApiService.getGames().then(response => {
        console.log("Got lobby...");
        const newGames: GameIndexDTO[] = [];
        if(response.data){
            response.data.forEach(game => {
                newGames.push(game);
            });
        }
        setGames(newGames);
        setIsLoading(false);
        
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