"use client";

import React, { useState, useEffect } from "react";
import { gameApiService } from "../services/gameAPIService";
import Confetti from "canvas-confetti";
import { useGameSocket } from "../hooks/useGameSocket";
import { useSocketConnection } from "../hooks/useSocketConnection";

export default function Board({ gameId, playerId, setMessage, leaveGame }: { gameId: number | null; playerId: number | null; setMessage: (message: string) => void; leaveGame: (gameId: number | null, playerId: number | null) => void; }) {

  const currGameId = gameId!;
  const currPlayerId = playerId!;
  const socket = useSocketConnection();

  const { } = useGameSocket(socket, {
    onPlayerJoinedGame(data) {
      setMessage(`Player ${data.playerId} joined the game.`);
    },
    onPlayerQuitGame(data) {
      setMessage(`Player ${data.playerId} quit the game.`);
    },
    onGameStateUpdate: (data) => {
      setBoard(data.game.board);
      setRowTop(findRowTop(data.game.board));
      if (data.game.turn > 2) {
        endGame(data.game.turn);
      }
      setTurn(data.game.turn);
      if(data.game.turn === playerId)
          setMessage('It\'s your turn!');
    }
  });

  //Update to use existing game state
  const [board, setBoard] = useState<number[]>(Array(42));
  const [rowTop, setRowTop] = useState(Array(7));
  const [turn, setTurn] = useState(1);
  const [confettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeunload', quitGame);

    if (!socket) return;

    socket.connect();

    const handleConnect = () => {
      gameApiService.joinGame(currPlayerId, currGameId, socket.id!).then(response => {
        setBoard(response.data.board);
        setTurn(response.data.turn);
        setRowTop(findRowTop(response.data.board));
      });
    };

    socket.on('connect', handleConnect);

    // Cleanup function
    return () => {
      socket.off('connect', handleConnect);
      socket.disconnect();
    };
  }, []);

  function findRowTop(board: number[]): number[] {
    const tops: number[] = [];
    for (let col = 0; col < 7; col++) {
      let top = 5; // Start from the bottom row
      while (top >= 0 && board[col + (top * 7)] !== 0) {
        top--;
      }
      tops[col] = top;
    }
    return tops;
  }

  function findSingleRowTop(board: number[], column: number): number {
    let top = 5; // Start from the bottom row
    while (top >= 0 && board[column + (top * 7)] !== 0) {
      top--;
    }
    return top;
  }

  function quitGame() {
    gameApiService.quitGame(currGameId, currPlayerId, socket.id!).then(() => {
      setMessage(`You quit the game.`);
      leaveGame(currGameId, currPlayerId);
    });
  }

  function handleSquareClick(column: number) {
    if (turn !== currPlayerId) return; // not this player's turn

    const id = column + (rowTop[column] * 7);

    if (board[id] !== 0) return; // already filled

    rowTop[column] -= 1;

    // Submit new move to server here
    gameApiService.updateGameState(currGameId, id, turn, socket.id!).then(response => {
      const newSquares = board.slice();
      newSquares[id] = turn;
      setBoard(newSquares);
      rowTop[column] = findSingleRowTop(newSquares, column);
      setRowTop(rowTop);
      if (response.data > 2) {
        endGame(currPlayerId);
      }
    });

    turn === 1 ? setTurn(2) : setTurn(1);

    setMessage('It is your opponent\'s turn');
  }

  function endGame(player: number) {
    setTimeout(() => {
      player = (player === 3 || player === 1) ? 1 : 2;
      if(currPlayerId !== player)
        alert(`You lose!`);
      else
      {
        alert(`You win!`);
        setConfettiVisible(true);
      }
      setConfettiVisible(false);
      
      // Show exit option
      alert("Game over! Press OK to exit to lobby.");
      quitGame();
    }, 300);
  }

  return (
    <div>
      <div className={`current-turn-${turn}`}>Current Turn: Player {turn}</div>
      <div className={`current-turn-${currPlayerId}`}>You are player {currPlayerId}</div>
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
      <div><button className="quit-button px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => quitGame()}>Quit Game</button></div>
    </div>
  );
}

function Square({ value, onSquareClick }: { value: number, onSquareClick: () => void }) {
  return <button className={`disc disc-${value}`} onClick={onSquareClick}></button>;
}