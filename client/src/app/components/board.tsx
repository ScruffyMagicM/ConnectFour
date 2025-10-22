"use client";

import React, { useState } from "react";
import { gameApiService } from "../services/gameAPIService";
import Confetti from "canvas-confetti";
import { useGameSocket } from "../hooks/useGameSocket";
import { Socket } from "socket.io-client";
import { GameStateDTO } from "../types/game.types";
import { useAppState } from "../hooks/useAppState";

export default function Board({ setMessage, leaveGame, socket }: { gameId: number | null; playerId: number | null; setMessage: (message: string) => void; leaveGame: (gameId: number | null, playerId: number | null) => void; socket: Socket | null; }) {

    const {
            board,
            setBoard,
            currentPlayer,
            roomId,
        } = useAppState();

    const currGameId = roomId!;
    const currPlayerId = currentPlayer!;

    const { playerJoinedGame, playerQuitGame, updateGameState } = useGameSocket(socket, {
    onPlayerJoinedGame(data) {
      setMessage(`Player ${data.playerId} joined the game.`);
    },
    onPlayerQuitGame(data) {
      setMessage(`Player ${data.playerId} quit the game.`);
    },
    onGameStateUpdate: (data) => {
      setBoard(data.game.board);
      if(data.game.turn > 2){
        endGame(data.game.turn);
      }
    }
  });

  playerJoinedGame(currPlayerId);

    //Update to use existing game state
    const [rowTop, setRowTop] = useState(Array(7).fill(5));
    const [turn, setTurn] = useState(1);
    const [confettiVisible, setConfettiVisible] = useState(false);

    for(let k = 0; k < 7; k++) {
        rowTop.push(5);
    }
    
    function handleSquareClick(column: number) {
        if(turn !== currPlayerId) return; // not this player's turn

        const id = column + (rowTop[column] * 7);

        if(board[id] !== 0) return; // already filled

        rowTop[column] -= 1;

        // Submit new move to server here
        gameApiService.updateGameState(currGameId, id, turn).then(response => {
            const newSquares = board.slice();
            newSquares[id] = turn;
            setBoard(newSquares);
            updateGameState({ board: board, lastMove: id, turn: response.data });
            if(response.data > 2){
                endGame(currPlayerId);
            }
        });
        
        turn === 1 ? setTurn(2) : setTurn(1);
    }

    function endGame(player: number){
        setConfettiVisible(true);
        setTimeout(() => {
            alert(`Player ${player} wins!`);
            setConfettiVisible(false);
        }, 300);

        // Show exit option
    }

    return (
        <div>
        <div className={`current-turn-${turn}`}>Current Turn: Player {turn}</div>
        <div className="board">
      <div className="board-row">
        <Square value={board[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={board[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={board[2]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={board[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={board[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={board[5]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={board[6]} onSquareClick={() => handleSquareClick(6)} />
      </div>
      <div className="board-row">
        <Square value={board[7]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={board[8]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={board[9]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={board[10]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={board[11]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={board[12]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={board[13]} onSquareClick={() => handleSquareClick(6)} />
      </div>
      <div className="board-row">
        <Square value={board[14]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={board[15]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={board[16]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={board[17]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={board[18]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={board[19]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={board[20]} onSquareClick={() => handleSquareClick(6)} />
      </div>
      <div className="board-row">
        <Square value={board[21]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={board[22]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={board[23]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={board[24]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={board[25]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={board[26]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={board[27]} onSquareClick={() => handleSquareClick(6)} />
      </div>
        <div className="board-row">
        <Square value={board[28]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={board[29]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={board[30]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={board[31]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={board[32]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={board[33]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={board[34]} onSquareClick={() => handleSquareClick(6)} />
      </div>
    <div className="board-row">
        <Square value={board[35]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={board[36]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={board[37]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={board[38]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={board[39]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={board[40]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={board[41]} onSquareClick={() => handleSquareClick(6)} />
      </div>
    </div>
    <div>{confettiVisible && <Confetti />}</div>
    <div><button className="quit-button" onClick={() => { playerQuitGame(currPlayerId); leaveGame(currGameId, currPlayerId); }}>Quit Game</button></div>
    </div>
    );
}

function Square({ value, onSquareClick }: { value: number, onSquareClick: () => void }){
  return <button className={`disc disc-${value}`} onClick={onSquareClick}></button>;
}