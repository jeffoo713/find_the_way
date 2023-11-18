import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import BoardService from '../../services/boardService';
import Cell from '../Cell/Cell';
import './board.style.scss';

function Board() {
  const widthSize = 6;

  const [restartCount, restartBoard] = useReducer(x => x + 1, 0);
  const boardService = useMemo(() => new BoardService(widthSize), []);
  const [board, sequence] = useMemo(() => boardService.createBoard(), [boardService, restartCount]);
  const [showWay, setShowWay] = useState<boolean>(true);
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [guessSequence, setGuessSequence] = useState<number[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const initialShowWay = useCallback((cell: number) => Boolean(cell) && showWay, [showWay]);

  useEffect(() => {
    setShowWay(true);
    setSuccess(false);
    setGuessSequence([]);
    setAttemptCount(1);

    const timer = setTimeout(() => {
      setShowWay(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [restartCount]);

  const handelClickCell = (idx: number) => {
    if (
      showWay ||
      success ||
      guessSequence.includes(idx) ||
      (guessSequence.length === 0 && idx >= widthSize)
    )
      return;

    const numOfFoundCells = guessSequence.length;
    const nextCellIdx = sequence.at(numOfFoundCells);

    if (nextCellIdx === idx) {
      setGuessSequence(prev => {
        const updated = [...prev, idx];

        if (updated.length === sequence.length) {
          setSuccess(true);
          console.log('YOU FOUND THE WAY!!');
        }

        return [...prev, idx];
      });
    } else {
      setGuessSequence([]);
      setAttemptCount(prev => ++prev);
      console.log('WRONG WAY!!');
    }
  };

  const isCellCorrect = (idx: number) => {
    return guessSequence.includes(idx);
  };

  return (
    <div>
      <p>{`Attempts: ${attemptCount}`}</p>
      <p onClick={() => restartBoard()}>Restart</p>
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
