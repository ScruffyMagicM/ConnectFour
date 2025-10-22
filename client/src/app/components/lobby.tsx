"use client";

import React, { useCallback, useState } from "react";
import type { GameIndexDTO } from "../types/game.types";
import { lobbyApiService } from "../services/lobbyAPIService";
import { useLobbySocket } from "../hooks/useLobbySocket";
import { Socket } from "socket.io-client";
import { useAppState } from "../hooks/useAppState";

const games: GameIndexDTO[] = [];

export default function Lobby({ enterGame, setMessage, socket }: { enterGame: (gameId: number | null, playerId: number | null) => void, setMessage: (message: string) => void, socket: Socket | null }) {
    const {
        roomId,
        setRoomId,
        currentPlayer,
        setCurrentPlayer,
        justQuitGame,
        setJustQuitGame,
    } = useAppState();

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

  if(justQuitGame === true){
    quitGame(roomId!, currentPlayer!);
    setJustQuitGame(false);
  }

  const clickJoinGame = () => (gameId: number) => {
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
    const tempName = `Game_${Math.floor(Math.random() * 1000)}`;

    lobbyApiService.createGame(gameName ? gameName : tempName).then(response => {
        if(response.data){
            setMessage(`Game "${gameName ? gameName : tempName}" created!`);
            createGame(gameName ? gameName : tempName);
            games.push(response.data);
        }
    });
  };

    lobbyApiService.getGames().then(response => {
        if(response.data){
            response.data.forEach(game => {
                games.push(game);
            });
        }
    });

    return (
        <div className="lobby">
            <h1>Welcome to Connect Four!</h1>
            <button className="lobby-button">Create Game</button>
            <ul className="game-list">
                <GamesList joinGame={clickJoinGame} />
            </ul>

            <button className="lobby-button" onClick={() => makeGame()}>Create Game</button>
        </div>
    );
}

export function GamesList({ joinGame }: { joinGame: (gameId: number) => void }) {
    const gameItems = games.map(game =>
    <li className="game-item" key={game.id}>
        {game.name} - {game.players}/2 <button className="join-button" onClick={() => joinGame(game.id)}>Join</button>
    </li>
  );

  return <ul>{gameItems}</ul>;
}