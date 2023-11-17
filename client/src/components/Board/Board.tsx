import { useMemo } from 'react';
import BoardService from '../../services/boardService';
import Cell from '../Cell/Cell';
import './board.style.scss';

function Board({ showWay }: BoardComp) {
  const widthSize = 5;

  const boardService = useMemo(() => new BoardService(widthSize), []);
  const [board, sequence] = useMemo(() => boardService.createBoard(), [boardService]);

  return (
    <div className='board' style={{ gridTemplateColumns: `repeat(${widthSize}, 1fr)` }}>
      {board.flat(1).map((cell, idx) => (
        <Cell key={`cell-${idx}`} filled={Boolean(cell)} showWay={showWay} />
      ))}
    </div>
  );
}

export default Board;
