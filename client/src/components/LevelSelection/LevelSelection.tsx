import styles from './levelSelection.module.scss';
import { GameLevel } from '@/enums/gameConfig';
import LevelSelectItem from '../LevelSelectItem/LevelSelectItem';

function LevelSelection() {
  return (
    <div className={styles.level_selection}>
      <h1>FIND THE WAY!</h1>
      <div className={styles.level_select_item_group}>
        <LevelSelectItem gameLevel={GameLevel.EASY} />
        <LevelSelectItem gameLevel={GameLevel.MODERATE} />
        <LevelSelectItem gameLevel={GameLevel.HARD} />
        <LevelSelectItem gameLevel={GameLevel.SUPER_HARD} />
      </div>
    </div>
  );
}

export default LevelSelection;
