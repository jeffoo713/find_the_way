import Cell from '../Cell/Cell';
import './board.style.scss';
import { useBoard } from '../hooks/useBoard';

function Board() {
  const widthSize = 6;

  const {
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
  } = useBoard(widthSize);

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
      <p>{`Attempt(s): ${attemptCount}`}</p>
      <p onClick={() => restartBoard()}>RESTART</p>
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
