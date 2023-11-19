import './boardTopBar.style.scss';

function BoardTopBar({
  attemptCount,
  remainingShowWayCount,
  temporaryShowWay,
  restartBoard,
  success,
}: BoardTopBarComp) {
  return (
    <div className='board-top-bar'>
      <div className='attempt-counter-container'>
        <p>{`Attempt(s): ${attemptCount}`}</p>
      </div>
      <div className='function-key-group'>
        <span
          onClick={() => temporaryShowWay()}
          style={{ cursor: `${remainingShowWayCount && !success ? 'pointer' : 'not-allowed'}` }}
        >{`SHOW WAY: ${remainingShowWayCount} Left`}</span>
        <span onClick={() => restartBoard()}>RESTART</span>
      </div>
    </div>
  );
}

export default BoardTopBar;
