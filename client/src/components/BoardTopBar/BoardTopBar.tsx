import { useContext } from 'react';
import styles from './boardTopBar.module.scss';
import { BoardContext } from '../../context/BoardContext/BoadContextProvider';
import { GlobalContext } from '../../context/GlobalContext/GlobalContext';
import { GameLevel } from '@/enums/gameConfig';
import { GAME_LEVEL_NAME, GAME_LEVEL_STYLES } from '../../constants';

function BoardTopBar() {
  const {
    state: {
      gameConfig: { gameLevel },
    },
  } = useContext(GlobalContext);
  const {
    attemptCount,
    remainingShowWayCount,
    temporaryShowWay,
    restartBoard,
    success,
    displayingWay,
  } = useContext(BoardContext);

  return (
    <div className={styles.board_top_bar}>
      <h1>FIND THE WAY!</h1>
      <div className={styles.board_info_banner}>
        <div className={styles.game_info_group}>
          {/* Is there a way not to assert gameLevel as Exclude<GameLevel, GameLevel.NULL> ? */}
          <span
            className={GAME_LEVEL_STYLES(styles)[gameLevel as Exclude<GameLevel, GameLevel.NULL>]}
          >
            {GAME_LEVEL_NAME[gameLevel as Exclude<GameLevel, GameLevel.NULL>]}
          </span>
          <span>{`Attempt(s): ${attemptCount}`}</span>
        </div>
        <div className={styles.function_key_group}>
          <span
            onClick={temporaryShowWay}
            style={{
              cursor: `${
                remainingShowWayCount && !success && !displayingWay ? 'pointer' : 'not-allowed'
              }`,
            }}
          >{`Hint (${remainingShowWayCount} Left)`}</span>
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
    </div>
  );
}

export default BoardTopBar;
