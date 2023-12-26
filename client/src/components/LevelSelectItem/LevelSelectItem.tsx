import { useContext, useMemo } from 'react';
import styles from './levelSelectItem.module.scss';
import { GlobalContext } from '../../stateManagement/globalContext';
import { GameConfigActionType, GameLevel } from '@/enums/gameConfig';

type LevelSelectItemProps = {
  gameLevel: GameLevel;
};

function LevelSelectItem(props: LevelSelectItemProps) {
  const { gameLevel } = props;
  const { dispatch } = useContext(GlobalContext);

  const title = useMemo(() => {
    switch (gameLevel) {
      case GameLevel.EASY:
        return 'EASY: 5X5';
      case GameLevel.MODERATE:
        return 'MODERATE: 6X6';
      case GameLevel.HARD:
        return 'HARD: 7X7';
      case GameLevel.SUPER_HARD:
        return 'SUPER HARD: 8X8';
      default:
        return 'EASY: 5X5';
    }
  }, [gameLevel]);

  const style_class = useMemo(() => {
    switch (gameLevel) {
      case GameLevel.EASY:
        return styles.level_easy;
      case GameLevel.MODERATE:
        return styles.level_moderate;
      case GameLevel.HARD:
        return styles.level_hard;
      case GameLevel.SUPER_HARD:
        return styles.level_super_hard;
      default:
        return styles.level_easy;
    }
  }, [gameLevel]);

  return (
    <div
      className={`${styles.level_select_item} ${style_class}`}
      onClick={() => {
        console.log('payload:', { gameLevel: gameLevel });
        dispatch({
          type: GameConfigActionType.SET_GAME_LEVEL,
          payload: { gameLevel: gameLevel },
        });
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default LevelSelectItem;
