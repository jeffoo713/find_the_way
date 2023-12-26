import { useContext } from 'react';
import Cell from '../Cell/Cell';
import './board.style.scss';
import { useBoard } from '../../hooks/useBoard';
import BoardTopBar from '../BoardTopBar/BoardTopBar';
import { GlobalContext } from '../../context/GlobalContext/GlobalContext';
import BoardContextProvider from '../../context/BoardContext/BoadContextProvider';

function Board() {
  const {
    state: {
      gameConfig: { gameLevel },
    },
  } = useContext(GlobalContext);

  const boardState = useBoard(gameLevel);
  const { widthSize, board } = boardState;

  return (
    <BoardContextProvider {...boardState}>
      <div>
        <BoardTopBar />
        <div className='board' style={{ gridTemplateColumns: `repeat(${widthSize}, 1fr)` }}>
          {board.flat(1).map((_cell, cellIdx) => (
            <Cell key={`cell-${cellIdx}`} cellIndex={cellIdx} />
          ))}
        </div>
      </div>
    </BoardContextProvider>
  );
}

export default Board;
