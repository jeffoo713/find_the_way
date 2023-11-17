import { useMemo } from 'react';
import BoardService from '../../services/boardService';
import Cell from '../Cell/Cell';
import './board.style.scss';

function Board({ widthSize, showWay }: BoardComp) {
  const boardService = useMemo(() => new BoardService(widthSize), [widthSize]);
  const [board, sequence] = useMemo(() => boardService.createBoard(), [boardService]);

  return (
    <div className='board'>
      {board.flat(1).map((cell, idx) => (
        <Cell key={`cell-${idx}`} filled={Boolean(cell)} showWay={showWay} />
      ))}
    </div>
  );
}

export default Board;
