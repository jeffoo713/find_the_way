import { useCallback, useEffect, useMemo, useState } from 'react';
import BoardService from '../../services/boardService';
import Cell from '../Cell/Cell';
import './board.style.scss';

function Board() {
  const widthSize = 5;
  const [showWay, setShowWay] = useState<boolean>(true);
  const initialShowWay = useCallback((cell: number) => Boolean(cell) && showWay, [showWay]);
  useEffect(() => {
    setTimeout(() => {
      setShowWay(false);
    }, 2000);
  }, []);

  const [guessSequence, setGuessSequence] = useState<number[]>([]);

  const boardService = useMemo(() => new BoardService(widthSize), []);
  const [board, sequence] = useMemo(() => boardService.createBoard(), [boardService]);

  const handelClickCell = (idx: number) => {
    if (showWay) return;

    const numOfFoundCells = guessSequence.length;
    const nextCellIdx = sequence.at(numOfFoundCells);

    if (nextCellIdx === idx) {
      setGuessSequence(prev => [...prev, idx]);
      console.log('CORRECT WAY!!');
      console.log([...guessSequence, idx]);
    } else {
      console.log('WRONG WAY!!');
    }

    if (guessSequence.length === sequence.length) {
      console.log('YOU FOUND THE WAY!!');
    }
  };

  const isCellCorrect = (idx: number) => {
    return guessSequence.includes(idx);
  };

  return (
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
  );
}

export default Board;
