import { useContext } from 'react';
import Cell from '../Cell/Cell';
import './board.style.scss';
import { useBoard } from '../../hooks/useBoard';
import BoardTopBar from '../BoardTopBar/BoardTopBar';
import { GlobalContext } from '../../Context/GlobalContext/GlobalContext';
import BoardContextProvider from '../../Context/BoardContext/BoadContextProvider';

function Board() {
  const {
    state: {
      gameConfig: { gameLevel },
    },
  } = useContext(GlobalContext);

  const boardState = useBoard(gameLevel);

  return (
    <BoardContextProvider {...boardState}>
      <div>
        <BoardTopBar
          attemptCount={boardState.attemptCount}
          remainingShowWayCount={boardState.remainingShowWayCount}
          temporaryShowWay={boardState.temporaryShowWay}
          restartBoard={boardState.restartBoard}
          success={boardState.success}
          displayingWay={boardState.displayingWay}
        />
        <div
          className='board'
          style={{ gridTemplateColumns: `repeat(${boardState.widthSize}, 1fr)` }}
        >
          {boardState.board.flat(1).map((_cell, cellIdx) => (
            <Cell
              key={`cell-${cellIdx}`}
              cellIndex={cellIdx}
              shouldLightUp={boardState.shouldCellLightUp(cellIdx)}
              onClick={boardState.handelClickCell}
            />
          ))}
        </div>
      </div>
    </BoardContextProvider>
  );
}

export default Board;
