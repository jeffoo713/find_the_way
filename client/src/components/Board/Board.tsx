import { useContext } from 'react';
import Cell from '../Cell/Cell';
import styles from './board.module.scss';
import { useBoard } from '../../hooks/useBoard';
import BoardTopBar from '../BoardTopBar/BoardTopBar';
import { GlobalContext } from '../../context/GlobalContext/GlobalContext';
import BoardContextProvider from '../../context/BoardContext/BoadContextProvider';
import { useBoardResizeStyle } from '../../hooks/useBoardResizeStyle';

function Board() {
  const {
    state: {
      gameConfig: { gameLevel },
    },
  } = useContext(GlobalContext);

  const boardState = useBoard(gameLevel);
  const { widthSize, board } = boardState;

  const { boardResizeStyles } = useBoardResizeStyle();

  return (
    <BoardContextProvider {...boardState}>
      <div className={styles.board_wrapper}>
        <BoardTopBar />
        <div
          className={styles.board}
          style={{ gridTemplateColumns: `repeat(${widthSize}, 1fr)`, ...boardResizeStyles }}
        >
          {board.flat(1).map((_cell, cellIdx) => (
            <Cell key={`cell-${cellIdx}`} cellIndex={cellIdx} />
          ))}
        </div>
      </div>
    </BoardContextProvider>
  );
}

export default Board;
