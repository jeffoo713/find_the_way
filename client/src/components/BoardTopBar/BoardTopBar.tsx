import './boardTopBar.style.scss';

function BoardTopBar({
  attemptCount,
  remainingShowWayCount,
  temporaryShowWay,
  restartBoard,
  success,
  displayingWay,
}: BoardTopBarComp) {
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
