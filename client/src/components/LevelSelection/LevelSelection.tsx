import { useContext } from 'react';
import styles from './levelSelection.module.scss';
import { GlobalContext } from '../../stateManagement/globalContext';
import { GameConfigActionType, GameLevel } from '@/enums/gameConfig';

function LevelSelection() {
  const {
    state: {
      gameConfig: { gameLevel },
    },
    dispatch,
  } = useContext(GlobalContext);

  console.log(gameLevel);
  return (
    <div className={styles.level_selection}>
      <h1>FIND THE WAY!</h1>
      <div className={styles.level_select_item_group}>
        <div
          className={`${styles.level_select_item} ${styles.level_easy}`}
          onClick={() => {
            dispatch({
              type: GameConfigActionType.SET_GAME_LEVEL,
              payload: { gameLevel: GameLevel.EASY },
            });
          }}
        >
          <h3>EASY: 5X5</h3>
        </div>
        <div className={`${styles.level_select_item} ${styles.level_moderate}`}>
          <h3>MODERATE: 6X6</h3>
        </div>
        <div className={`${styles.level_select_item} ${styles.level_hard}`}>
          <h3>HARD: 7X7</h3>
        </div>
        <div className={`${styles.level_select_item} ${styles.level_super_hard}`}>
          <h3>SUPER HARD: 8X8</h3>
        </div>
      </div>
    </div>
  );
}

export default LevelSelection;
