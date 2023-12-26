import { useContext } from 'react';
import './boardTopBar.style.scss';
import { BoardContext } from '../../context/BoardContext/BoadContextProvider';

function BoardTopBar() {
  const {
    attemptCount,
    remainingShowWayCount,
    temporaryShowWay,
    restartBoard,
    success,
    displayingWay,
  } = useContext(BoardContext);

  return (
    <div className='board-top-bar'>
      <p>{`Attempt(s): ${attemptCount}`}</p>
      <div className='function-key-group'>
        <span
          onClick={temporaryShowWay}
          style={{
            cursor: `${
              remainingShowWayCount && !success && !displayingWay ? 'pointer' : 'not-allowed'
            }`,
          }}
        >{`SHOW WAY: ${remainingShowWayCount} Left`}</span>
        <span
          onClick={restartBoard}
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
