import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import BoardService from '../services/boardService';
import { GameLevel } from '@/enums/gameConfig';

export const useBoard = (gameLevel: GameLevel) => {
  const widthSize = gameLevel + 4;
  const [displayingWay, setDisplayingWay] = useState<boolean>(true);
  const [restartCount, restartBoard] = useReducer(x => {
    if (displayingWay) return x;

    return x + 1;
  }, 0);

  const boardService = useMemo(() => new BoardService(widthSize), [widthSize]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [board, sequence] = useMemo(() => boardService.createBoard(), [boardService, restartCount]);

  const [remainingShowWayCount, setRemainingShowWayCount] = useState<number>(2);
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [guessSequence, setGuessSequence] = useState<number[]>([]);
  const [wrongCellIndex, setWrongCellIndex] = useState<number>(-1);
  const [success, setSuccess] = useState<boolean>(false);

  const [cellIndexTolightUp, setCellIndexTolightUp] = useState<number>(-1);

  useEffect(() => {
    setDisplayingWay(true);

    const timers: NodeJS.Timeout[] = [];

    sequence.forEach((cellIdx, i) => {
      if (guessSequence.includes(cellIdx)) return;

      const timer = setTimeout(() => {
        setCellIndexTolightUp(cellIdx);
      }, 500 * (i - guessSequence.length));
      timers.push(timer);
    });

    const finalTimer = setTimeout(() => {
      setCellIndexTolightUp(-1);
      setDisplayingWay(false);
    }, 500 * (sequence.length - guessSequence.length));
    timers.push(finalTimer);

    return () => {
      timers.forEach(clearTimeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence, remainingShowWayCount]);

  useEffect(() => {
    setSuccess(false);
    setGuessSequence([]);
    setAttemptCount(1);
    setRemainingShowWayCount(2);
  }, [restartCount]);

  const _shouldIgnoreCellClick = (idx: number) =>
    success ||
    guessSequence.includes(idx) ||
    (guessSequence.length === 0 && idx >= widthSize) ||
    displayingWay ||
    wrongCellIndex !== -1;

  const handelClickCell = (idx: number) => {
    if (_shouldIgnoreCellClick(idx)) return;

    const correctGuess = sequence.at(guessSequence.length) === idx;

    if (correctGuess) {
      setGuessSequence(prev => {
        const updated = [...prev, idx];

        if (updated.length === sequence.length) {
          setSuccess(true);
          return [];
        }

        return updated;
      });
    } else {
      setWrongCellIndex(idx);
      setAttemptCount(prev => ++prev);

      setTimeout(() => {
        setWrongCellIndex(-1);
        setGuessSequence([]);
      }, 500);
    }
  };

  const _isCellCorrect = useCallback(
    (idx: number) => {
      return guessSequence.includes(idx);
    },
    [guessSequence],
  );

  const temporaryShowWay = () => {
    if (remainingShowWayCount === 0 || success || displayingWay) return;

    setRemainingShowWayCount(prev => --prev);
  };

  const _showWayWhenSuccess = useCallback(
    (cellIdx: number) => success && sequence.includes(cellIdx),
    [success, sequence],
  );

  const shouldCellLightUp = useCallback(
    (cellIdx: number) =>
      cellIndexTolightUp === cellIdx || _isCellCorrect(cellIdx) || _showWayWhenSuccess(cellIdx),
    [cellIndexTolightUp, _isCellCorrect, _showWayWhenSuccess],
  );

  const isWrongCell = useCallback(
    (cellIdx: number) => wrongCellIndex === cellIdx,
    [wrongCellIndex],
  );

  const showFinishFlag = useCallback(
    (cellIdx: number) => success && sequence.at(-1) === cellIdx,
    [success, sequence],
  );

  return {
    widthSize,
    board,
    temporaryShowWay,
    remainingShowWayCount,
    attemptCount,
    restartBoard,
    handelClickCell,
    success,
    cellIndexTolightUp,
    displayingWay,
    shouldCellLightUp,
    isWrongCell,
    showFinishFlag,
  };
};
