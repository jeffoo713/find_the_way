import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import BoardService from '../../services/boardService';

export const useBoard = (widthSize: number) => {
  const [restartCount, restartBoard] = useReducer(x => x + 1, 0);

  const boardService = useMemo(() => new BoardService(widthSize), [widthSize]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [board, sequence] = useMemo(() => boardService.createBoard(), [boardService, restartCount]);

  const [showWay, setShowWay] = useState<boolean>(true);
  const [remainingShowWayCount, setRemainingShowWayCount] = useState<number>(2);
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [guessSequence, setGuessSequence] = useState<number[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const initialShowWay = useCallback((cell: number) => Boolean(cell) && showWay, [showWay]);

  useEffect(() => {
    setShowWay(true);
    setSuccess(false);
    setGuessSequence([]);
    setAttemptCount(1);
    setRemainingShowWayCount(2);

    const timer = setTimeout(() => {
      setShowWay(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [restartCount]);

  const shouldIgnoreClick = (idx: number) =>
    showWay ||
    success ||
    guessSequence.includes(idx) ||
    (guessSequence.length === 0 && idx >= widthSize);

  const handelClickCell = (idx: number) => {
    if (shouldIgnoreClick(idx)) return;

    const numOfFoundCells = guessSequence.length;
    const nextCellIdx = sequence.at(numOfFoundCells);
    const correctGuess = nextCellIdx === idx;

    if (correctGuess) {
      setGuessSequence(prev => {
        const updated = [...prev, idx];

        if (updated.length === sequence.length) {
          setSuccess(true);
          console.log('YOU FOUND THE WAY!!');
        }

        return updated;
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

  const temporaryShowWay = () => {
    if (showWay || remainingShowWayCount === 0) return;

    setShowWay(true);
    setRemainingShowWayCount(prev => --prev);
    setTimeout(() => {
      setShowWay(false);
    }, 700);
  };

  return {
    board,
    initialShowWay,
    temporaryShowWay,
    remainingShowWayCount,
    attemptCount,
    restartBoard,
    handelClickCell,
    isCellCorrect,
  };
};
