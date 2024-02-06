import React, { useState } from "react";
import Square from "./Square"; // Import Square component

function Board() {
  // Initialize game state with an array representing the board and whether it's X's turn
  const initialGameState = Array(9).fill(null);
  const [state, setState] = useState(initialGameState); // State to hold the current game state
  const [isXTurn, setIsXTurn] = useState(true); // State to track whose turn it is (X or O)

  // Function to handle clicks on the squares
  const handleClick = (index) => {
    // Ignore click if square is already filled or there's a winner
    if (state[index] || checkWinner()) return;

    // Create a copy of the current state array
    const copyState = [...state];
    // Fill the clicked square with X or O based on whose turn it is
    copyState[index] = isXTurn ? "X" : "O";
    // Update the state with the new game state
    setState(copyState);
    // Toggle turns for the next move
    setIsXTurn(!isXTurn);
  };

  // Function to check if there's a winner or if it's a draw
  const checkWinner = () => {
    // Define the winning combinations
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for a winner
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a]; // Return the winner ('X' or 'O')
      }
    }

    // Check for draw
    if (state.every((square) => square !== null)) {
      return "draw"; // Return 'draw' if all squares are filled and no winner is found
    }

    return null; // Return null if there's no winner or draw
  };

  const winner = checkWinner(); // Determine if there's a winner or draw

  // Function to restart the game
  const restartGame = () => {
    setState(initialGameState); // Reset the game state to initial
    setIsXTurn(true); // Set X as the starting player
  };

  // Render the game board
  return (
    <>
      {/* Display whose turn it is */}
      <div className="absolute top-2 left-9 text-lg font-semibold text-black  hover:scale-110 hover:border-2 cursor-pointer ">
        {isXTurn ? "X's Plyer Turn" : "O's Plyer Turn"}
      </div>
      {/* Game board container */}
      <div className="board-container m-10 relative">
        {/* Render each square */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {state.map((value, index) => (
            <Square
              key={index}
              onClick={() => handleClick(index)}
              value={value}
            />
          ))}
        </div>
        {/* Display winner message if there's a winner */}
        {winner && winner !== "draw" && (
          <div className="absolute inset-0 flex justify-center items-center rounded-xl bg-green-900 bg-opacity-50 z-10">
            <p className="text-2xl font-bold text-white p-4 rounded-lg bg-green-500 transform transition-all duration-500">
              {isXTurn ? "O" : "X"} wins!
            </p>
          </div>
        )}
        {/* Display draw message if it's a draw */}
        {winner === "draw" && (
          <div className="absolute inset-0 flex justify-center rounded-xl items-center bg-red-900 bg-opacity-50 z-10">
            <p className="text-2xl font-bold text-white p-4 rounded-lg bg-red-600 transform transition-all duration-500">
              It's a draw!
            </p>
          </div>
        )}
        {/* Restart game button */}
        <button
          className="absolute mt-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600"
          onClick={restartGame}
        >
          Restart Game
        </button>
      </div>
    </>
  );
}

export default Board;
