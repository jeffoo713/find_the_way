import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import BoardService from '../../services/boardService';

export const useBoard = (widthSize: number) => {
  const [restartCount, restartBoard] = useReducer(x => x + 1, 0);

  const boardService = useMemo(() => new BoardService(widthSize), [widthSize]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return {
    board,
    sequence,
    showWay,
    initialShowWay,
    attemptCount,
    setAttemptCount,
    guessSequence,
    setGuessSequence,
    success,
    setSuccess,
    restartBoard,
  };
};
