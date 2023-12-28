import { useContext, useState } from 'react';
import './cell.style.scss';
import { BoardContext } from '../../context/BoardContext/BoadContextProvider';

type CellComp = {
  cellIndex: number;
};

function Cell({ cellIndex }: CellComp) {
  const { shouldCellLightUp, handelClickCell, isWrongCell } = useContext(BoardContext);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`cell ${shouldCellLightUp(cellIndex) && 'correct_cell'} ${
        isWrongCell(cellIndex) && 'wrong_cell'
      } ${
        isHovering &&
        !success &&
        !shouldCellLightUp(cellIndex) &&
        !isWrongCell(cellIndex) &&
        'cell_hovered'
      }`}
      onClick={() => handelClickCell(cellIndex)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    />
  );
}

export default Cell;
