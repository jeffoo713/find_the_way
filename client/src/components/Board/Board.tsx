import Cell from '../Cell/Cell';
import './board.style.scss';
import { useBoard } from '../hooks/useBoard';

function Board() {
  const widthSize = 6;

  const { board, initialShowWay, attemptCount, restartBoard, handelClickCell, isCellCorrect } =
    useBoard(widthSize);

  return (
    <div>
      <p>{`Attempt(s): ${attemptCount}`}</p>
      <p onClick={() => restartBoard()}>RESTART</p>
      <div className='board' style={{ gridTemplateColumns: `repeat(${widthSize}, 1fr)` }}>
        {board.flat(1).map((cell, idx) => (
          <Cell
            key={`cell-${idx}`}
            cellIndex={idx}
            shouldLightUp={initialShowWay(cell) || isCellCorrect(idx)}
            onClick={handelClickCell}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;