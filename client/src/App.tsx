import './app.scss';

const WITH_SIZE = 8;
type BoardRowType = Array<0 | 1>;
const boardRow: BoardRowType = new Array<0 | 1>(WITH_SIZE).fill(0);
type BoardType = Array<BoardRowType>;
const board = new Array<BoardRowType>(WITH_SIZE).fill(boardRow);

const getStartCellNumber = (numOfCellsInRow: number) => Math.floor(Math.random() * numOfCellsInRow);

const createBoard = (board: BoardType) => {
  const boardToStart: BoardType = [];

  let prevLastCellIndex: number;

  board.forEach((row, i) => {
    if (i === 0) {
      const startCellIndex = getStartCellNumber(WITH_SIZE);
      prevLastCellIndex = startCellIndex;
      console.log('row ', i, 'prevLastCellIndex:', prevLastCellIndex);
      const plainRow: BoardRowType = new Array<0 | 1>(WITH_SIZE).fill(0);
      plainRow[startCellIndex] = 1;
      boardToStart[i] = [...plainRow];
      return;
    }

    if (i === WITH_SIZE - 1) {
      const plainRow: BoardRowType = new Array<0 | 1>(WITH_SIZE).fill(0);
      plainRow[prevLastCellIndex] = 1;
      boardToStart[i] = [...plainRow];
      console.log('row ', i, 'prevLastCellIndex:', prevLastCellIndex);
      return;
    }

    const plainRow: BoardRowType = new Array<0 | 1>(WITH_SIZE).fill(0);
    plainRow[prevLastCellIndex] = 1;

    const shouldTurn = Math.random() > 0.3;
    console.log('row:', i, 'should turn? ', shouldTurn);

    if (shouldTurn) {
      const shouldTurnLeft = prevLastCellIndex !== 0 && Math.random() > 0.4;
      const totalTurnSteps = Math.floor(Math.random() * 2) + 1; // 1 or 2
      console.log(
        'row:',
        i,
        'should turn left? ',
        shouldTurnLeft,
        'totalTurnSteps ',
        totalTurnSteps
      );

      if (shouldTurnLeft) {
        for (let j = 1; j < totalTurnSteps + 1; j += 1) {
          if (prevLastCellIndex - j >= 0) {
            plainRow[prevLastCellIndex - j] = 1;
          }
        }
        prevLastCellIndex = Math.max(prevLastCellIndex - totalTurnSteps, 0);
      } else {
        for (let j = 1; j < totalTurnSteps + 1; j += 1) {
          if (prevLastCellIndex + j <= WITH_SIZE - 1) {
            plainRow[prevLastCellIndex + j] = 1;
          }
        }
        prevLastCellIndex = Math.min(prevLastCellIndex + totalTurnSteps, WITH_SIZE - 1);
      }
    }

    boardToStart[i] = [...plainRow];
    console.log('row ', i, 'prevLastCellIndex:', prevLastCellIndex);
    return;
  });

  console.log('board created: ', boardToStart);
};

function App() {
  createBoard(board);
  return (
    <div className='app'>
      <h1>START FIND THE WAY!</h1>
      <div className='board'>
        {board.flat(1).map((cell, idx) => (
          <div
            key={`cell-${idx}`}
            style={{
              aspectRatio: '1/1',
              border: '1px solid black',
              margin: '.2rem',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
