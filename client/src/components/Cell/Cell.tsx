import { useContext } from 'react';
import './cell.style.scss';
import { BoardContext } from '../../context/BoardContext/BoadContextProvider';

type CellComp = {
  cellIndex: number;
};

function Cell({ cellIndex }: CellComp) {
  const { shouldCellLightUp, handelClickCell, isWrongCell } = useContext(BoardContext);

  return (
    <div
      className={`cell ${shouldCellLightUp(cellIndex) && 'correct_cell'} ${
        isWrongCell(cellIndex) && 'wrong_cell'
      }`}
      onClick={() => handelClickCell(cellIndex)}
    />
  );
}

export default Cell;
