import './app.scss';

const WITH_SIZE = 8;
type BoardRowType = Array<0 | 1>;
const boardRow: BoardRowType = new Array<0 | 1>(WITH_SIZE).fill(0);
type BoardType = Array<BoardRowType>;
const emptyBoard = new Array<BoardRowType>(WITH_SIZE).fill(boardRow);

const getStartCellNumber = (numOfCellsInRow: number) => Math.floor(Math.random() * numOfCellsInRow);

const createBoard = (board: BoardType) => {
  const boardToStart: BoardType = [];

  let prevLastCellIndex: number;
  let prevTurnLeft: boolean | null;

  board.forEach((row, i) => {
    if (i === 0) {
      const startCellIndex = getStartCellNumber(WITH_SIZE);
      prevLastCellIndex = startCellIndex;
    }

    const plainRow: BoardRowType = new Array<0 | 1>(WITH_SIZE).fill(0);
    plainRow[prevLastCellIndex] = 1;

    const shouldTurnLeft =
      (prevLastCellIndex !== 0 && prevTurnLeft !== false && Math.random() > 0.4) ||
      (prevLastCellIndex === WITH_SIZE - 1 && Math.random() > 0.35);

    if ((shouldTurnLeft && prevTurnLeft === false) || (!shouldTurnLeft && prevTurnLeft === true)) {
      boardToStart[i] = [...plainRow];
      console.log('row ', i, 'prevLastCellIndex:', prevLastCellIndex);
      prevTurnLeft = null;
      return;
    }
    const totalTurnSteps = Math.floor(Math.random() * 3) + 1; // 1 | 2 | 3
    console.log('row:', i, 'should turn left? ', shouldTurnLeft, 'totalTurnSteps ', totalTurnSteps);

    if (shouldTurnLeft) {
      prevTurnLeft = true;
      for (let j = 1; j < totalTurnSteps + 1; j += 1) {
        if (prevLastCellIndex - j >= 0) {
          plainRow[prevLastCellIndex - j] = 1;
        }
      }
      prevLastCellIndex = Math.max(prevLastCellIndex - totalTurnSteps, 0);
    } else {
      prevTurnLeft = false;
      for (let j = 1; j < totalTurnSteps + 1; j += 1) {
        if (prevLastCellIndex + j <= WITH_SIZE - 1) {
          plainRow[prevLastCellIndex + j] = 1;
        }
      }
      prevLastCellIndex = Math.min(prevLastCellIndex + totalTurnSteps, WITH_SIZE - 1);
    }

    boardToStart[i] = [...plainRow];
    console.log('row ', i, 'prevLastCellIndex:', prevLastCellIndex);
    return;
  });

  console.log('board created: ', boardToStart);
  return boardToStart;
};

function App() {
  const boardToStart = createBoard(emptyBoard);
  return (
    <div className='app'>
      <h1>START FIND THE WAY!</h1>
      <div className='board'>
        {boardToStart.flat(1).map((cell, idx) => (
          <div
            key={`cell-${idx}`}
            style={{
              aspectRatio: '1/1',
              border: '1px solid black',
              margin: '.2rem',
              backgroundColor: `${!!cell && 'green'}`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
