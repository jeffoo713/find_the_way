import { useContext, useMemo } from 'react';
import './cell.style.scss';
import { BoardContext } from '../../context/BoardContext/BoadContextProvider';

type CellComp = {
  cellIndex: number;
};

function Cell({ cellIndex }: CellComp) {
  const { shouldCellLightUp, handelClickCell } = useContext(BoardContext);

  const shouldLightUp = useMemo(() => shouldCellLightUp(cellIndex), [cellIndex, shouldCellLightUp]);

  return (
    <div
      className='cell'
      style={{
        backgroundColor: `${shouldLightUp ? 'green' : 'unset'}`,
      }}
      onClick={() => handelClickCell(cellIndex)}
    />
  );
}

export default Cell;
