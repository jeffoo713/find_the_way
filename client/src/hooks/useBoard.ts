import { useEffect, useMemo, useReducer, useState } from 'react';
import BoardService from '../services/boardService';
import { GameLevel } from '@/enums/gameConfig';

export const useBoard = (gameLevel: GameLevel) => {
  const widthSize = useMemo(() => {
    switch (gameLevel) {
      case GameLevel.EASY:
        return 5;
      case GameLevel.MODERATE:
        return 6;
      case GameLevel.HARD:
        return 7;
      case GameLevel.SUPER_HARD:
        return 8;
      default:
        return 6;
    }
  }, [gameLevel]);

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
  const [success, setSuccess] = useState<boolean>(false);

  const [cellIndexTolightUp, setCellIndexTolightUp] = useState<number>(-1);

  useEffect(() => {
    setDisplayingWay(true);

    sequence.forEach((cellIdx, i) => {
      if (guessSequence.includes(cellIdx)) return;

      setTimeout(() => {
        setCellIndexTolightUp(cellIdx);
      }, 500 * (i - guessSequence.length));
    });

    setTimeout(() => {
      setCellIndexTolightUp(-1);
      setDisplayingWay(false);
    }, 500 * (sequence.length - guessSequence.length));
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
    displayingWay;

  const handelClickCell = (idx: number) => {
    if (_shouldIgnoreCellClick(idx)) return;

    const correctGuess = sequence.at(guessSequence.length) === idx;

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
    if (remainingShowWayCount === 0 || success || displayingWay) return;

    setRemainingShowWayCount(prev => --prev);
  };

  return {
    widthSize,
    board,
    temporaryShowWay,
    remainingShowWayCount,
    attemptCount,
    restartBoard,
    handelClickCell,
    isCellCorrect,
    success,
    cellIndexTolightUp,
    displayingWay,
  };
};
