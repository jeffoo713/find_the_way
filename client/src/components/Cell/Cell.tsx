import './cell.style.scss';

function Cell({ filled, showWay }: CellComp) {
  return (
    <div
      className='cell'
      style={{
        backgroundColor: `${showWay && filled ? 'green' : 'unset'}`,
      }}
    />
  );
}

export default Cell;
