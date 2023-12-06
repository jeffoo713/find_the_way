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
          onClick={() => temporaryShowWay()}
          style={{
            cursor: `${
              remainingShowWayCount && !success && !displayingWay ? 'pointer' : 'not-allowed'
            }`,
          }}
        >{`SHOW WAY: ${remainingShowWayCount} Left`}</span>
        <span
          onClick={() => restartBoard()}
          style={{
            cursor: `${!displayingWay ? 'pointer' : 'not-allowed'}`,
          }}
        >
          RESTART
        </span>
      </div>
    </div>
  );
}

export default BoardTopBar;
