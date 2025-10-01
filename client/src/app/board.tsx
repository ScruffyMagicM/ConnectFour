"use client";

import React, { useState } from "react";
import Confetti from "canvas-confetti";

export default function Board() {
    const [squares, setSquares] = useState(Array(42).fill(0));
    const [rowTop, setRowTop] = useState(Array(7).fill(5));
    const [turn, setTurn] = useState(1);
    const [confettiVisible, setConfettiVisible] = useState(false);

    for(let k = 0; k < 7; k++) {
        rowTop.push(5);
    }
    
    function handleSquareClick(column: number) {
        const id = column + (rowTop[column] * 7);
        const row = rowTop[column];

        if(squares[id] !== 0) return; // already filled

        rowTop[column] -= 1;

        const newSquares = squares.slice();
        newSquares[id] = turn;
        setSquares(newSquares);
        
        if(checkVictory(row, column, turn))
            endGame(turn);

        turn === 1 ? setTurn(2) : setTurn(1);
    }

    function endGame(player: number){
        setConfettiVisible(true);
        setTimeout(() => {
            alert(`Player ${player} wins!`);
            setConfettiVisible(false);
        }, 300);
        setSquares(Array(42).fill(0));
        setRowTop(Array(7).fill(5));
        setTurn(1);
    }

    function checkVictory(x: number, y: number, player: number) : boolean {
        // Check horizontal, vertical, and diagonal for a win

        for(let i = 0; i < 8; i++) {
            let count = 1;
            let dx = 0, dy = 0;
            switch(i){
                case 0: // left
                    dx = 0; dy = -1; break;
                case 1: // right
                    dx = 0; dy = 1; break;
                case 2: // up
                    dx = -1; dy = 0; break;
                case 3: // down
                    dx = 1; dy = 0; break;
                case 4: // up-left
                    dx = -1; dy = -1; break;
                case 5: // up-right
                    dx = -1; dy = 1; break;
                case 6: // down-left
                    dx = 1; dy = -1; break;
                case 7: // down-right
                    dx = 1; dy = 1; break;
                default:
                    throw new Error("Invalid direction");
            }
            for(let j = 1; j < 5; j++) {
                const newX = x + (dx * j);
                const newY = y + (dy * j);
                if(newX < 0 || newX > 5 || newY < 0 || newY > 6) break; // out of bounds

                const id = newY + (newX * 7);

                if(squares[id] === player) {
                    count++;
                    if(count === 4) return true;
                }
                else
                    break;
            }
        }

        return false;
    }

    return (
        <div>
        <div className={`current-turn-${turn}`}>Current Turn: Player {turn}</div>
        <div className="board">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[9]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[10]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[11]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[12]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[13]} onSquareClick={() => handleSquareClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[14]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[15]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[16]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[17]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[18]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[19]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[20]} onSquareClick={() => handleSquareClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[21]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[22]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[23]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[24]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[25]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[26]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[27]} onSquareClick={() => handleSquareClick(6)} />
      </div>
        <div className="board-row">
        <Square value={squares[28]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[29]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[30]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[31]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[32]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[33]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[34]} onSquareClick={() => handleSquareClick(6)} />
      </div>
    <div className="board-row">
        <Square value={squares[35]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[36]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[37]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[38]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[39]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[40]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[41]} onSquareClick={() => handleSquareClick(6)} />
      </div>
    </div>
    <div>{confettiVisible && <Confetti />}</div>
    </div>
    );
}

function Square({ value, onSquareClick }: { value: string, onSquareClick: () => void }){
  return <button className={`disc disc-${value}`} onClick={onSquareClick}></button>;
}