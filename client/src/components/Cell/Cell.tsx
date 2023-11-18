import './cell.style.scss';

function Cell({ cellIndex, shouldLightUp, onClick }: CellComp) {
  return (
    <div
      className='cell'
      style={{
        backgroundColor: `${shouldLightUp ? 'green' : 'unset'}`,
      }}
      onClick={() => onClick(cellIndex)}
    />
  );
}

export default Cell;
