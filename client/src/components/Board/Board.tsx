import { useContext } from 'react';
import Cell from '../Cell/Cell';
import './board.style.scss';
import { useBoard } from '../../hooks/useBoard';
import BoardTopBar from '../BoardTopBar/BoardTopBar';
import { GlobalContext } from '../../stateManagement/globalContext';

function Board() {
  const {
    state: {
      gameConfig: { gameLevel },
    },
  } = useContext(GlobalContext);

  const {
    widthSize,
    board,
    temporaryShowWay,
    remainingShowWayCount,
    attemptCount,
    restartBoard,
    handelClickCell,
    isCellCorrect,
    success,
    cellIndexTolightUp,
    displayingWay,
  } = useBoard(gameLevel);

  return (
    <div>
      <BoardTopBar
        attemptCount={attemptCount}
        remainingShowWayCount={remainingShowWayCount}
        temporaryShowWay={temporaryShowWay}
        restartBoard={restartBoard}
        success={success}
        displayingWay={displayingWay}
      />
      <div className='board' style={{ gridTemplateColumns: `repeat(${widthSize}, 1fr)` }}>
        {board.flat(1).map((cell, idx) => (
          <Cell
            key={`cell-${idx}`}
            cellIndex={idx}
            shouldLightUp={cellIndexTolightUp === idx || isCellCorrect(idx)}
            onClick={handelClickCell}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
