import { useState, React } from 'react';

const TicTacToe = () => {
  const [boardData, setBoardData] = useState([null, null, null, null, null, null, null, null, null]);
  const [player, setPlayer] = useState('X');

  const updateBoard = (index) => {
    const newBoardData = [...boardData];
    if (newBoardData[index] === null) {
      newBoardData[index] = player;
      setBoardData(newBoardData);
      switchPlayer();
    }
  }

  const switchPlayer = () => {
    setPlayer(player === 'X' ? 'O' : 'X');
  }

  const checkForTie = () => {
    return boardData.every(value => value !== null);
  }

  const checkForWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
        return boardData[a];
      }
    }
    return checkForTie() ? 'Tie' : null;
  }

  function Tile({ value, index }) {
    return (
      <div
        className="flex items-center justify-center bg-white border-2 border-gray-300 w-24 h-24 cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => updateBoard(index)}
      >
        <h1 className="text-4xl font-bold text-gray-800">{value}</h1>
      </div>
    )
  }

  function Board() {
    return (
      <div className="grid grid-cols-3 gap-2 bg-gray-900 p-4 rounded-lg shadow-lg">
        {boardData.map((tile, index) => (
          <Tile key={index} value={tile} index={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 min-h-screen bg-gray-900 shadow-lg">
      <div className="flex items-center justify-center gap-10">
        <img
            className="mb-5 h-40 w-40 rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            src='data:image/png;base64,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'
            alt="xox"
        />
        <img
            className="mb-5 h-40 w-40 rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            src="https://media.licdn.com/dms/image/D4D0BAQFP06KIT9w-HQ/company-logo_200_200/0/1702301357329/chexplease_logo?e=2147483647&v=beta&t=Lo1cywqBHwlSUTUG2ui5VCFv-MeRQlBgjQttkr5R22k"
            alt="chex"
        />
    </div>
      <Board />
      {checkForWinner() && (
        <>
          <h1 className="text-2xl font-bold text-white mt-4">
            {checkForWinner() === 'Tie' ? 'Tie game' : `Winner: ${checkForWinner()}`}
          </h1>
          <button
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => setBoardData([null, null, null, null, null, null, null, null, null])}
          >
            New Game
          </button>
        </>
      )}
    </div>
  )
}

export default TicTacToe;
