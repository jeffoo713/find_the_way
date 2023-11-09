import BoardService from '../../services/boardService';
import './board.style.scss';

function Board() {
  const boardService = new BoardService(8);

  const [boardToStart, sequence] = boardService.createBoard();

  return (
    <div className='board'>
      {boardToStart.flat(1).map((cell, idx) => (
        <div
          key={`cell-${idx}`}
          style={{
            aspectRatio: '1/1',
            border: '1px solid black',
            margin: '.2rem',
            backgroundColor: `${!!cell && 'green'}`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Board;
