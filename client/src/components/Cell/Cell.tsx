import { useContext, useState } from 'react';
import styles from './cell.module.scss';
import { BoardContext } from '../../context/BoardContext/BoadContextProvider';

type CellComp = {
  cellIndex: number;
};

function Cell({ cellIndex }: CellComp) {
  const { shouldCellLightUp, handelClickCell, isWrongCell, success, showFinishFlag } =
    useContext(BoardContext);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`${styles.cell} ${shouldCellLightUp(cellIndex) && styles.correct_cell} ${
        isWrongCell(cellIndex) && styles.wrong_cell
      } ${
        isHovering &&
        !success &&
        !shouldCellLightUp(cellIndex) &&
        !isWrongCell(cellIndex) &&
        styles.cell_hovered
      }`}
      onClick={() => handelClickCell(cellIndex)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={`${showFinishFlag(cellIndex) && styles.last_cell}`}>FINISH</span>
    </div>
  );
}

export default Cell;
