import { useContext } from 'react';
import './boardTopBar.style.scss';
import { BoardContext } from '../../Context/BoardContext/BoadContextProvider';

function BoardTopBar({
  attemptCount,
  remainingShowWayCount,
  temporaryShowWay,
  restartBoard,
  success,
  displayingWay,
}: BoardTopBarComp) {
  const boardState = useContext(BoardContext);
  console.log(boardState);

  return (
    <div className='board-top-bar'>
      <p>{`Attempt(s): ${attemptCount}`}</p>
      <div className='function-key-group'>
        <span
          onClick={() => !displayingWay && temporaryShowWay()}
          style={{
            cursor: `${
              remainingShowWayCount && !success && !displayingWay ? 'pointer' : 'not-allowed'
            }`,
          }}
        >{`SHOW WAY: ${remainingShowWayCount} Left`}</span>
        <span
          onClick={() => !displayingWay && restartBoard()}
          style={{
            cursor: `${displayingWay ? 'not-allowed' : 'pointer'}`,
          }}
        >
          RESTART
        </span>
      </div>
    </div>
  );
}

export default BoardTopBar;
