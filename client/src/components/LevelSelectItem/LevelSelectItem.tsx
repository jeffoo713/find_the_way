import { useContext, useMemo } from 'react';
import styles from './levelSelectItem.module.scss';
import { GlobalContext } from '../../context/GlobalContext/GlobalContext';
import { GameConfigActionType, GameLevel } from '@/enums/gameConfig';

type LevelSelectItemProps = {
  gameLevel: Exclude<GameLevel, GameLevel.NULL>;
};

const LEVEL_TITLES: Record<Exclude<GameLevel, GameLevel.NULL>, string> = {
  [GameLevel.EASY]: 'EASY: 5X5',
  [GameLevel.MODERATE]: 'MODERATE: 6X6',
  [GameLevel.HARD]: 'HARD: 7X7',
  [GameLevel.SUPER_HARD]: 'SUPER HARD: 8X8',
};

const LEVEL_STYLES: Record<Exclude<GameLevel, GameLevel.NULL>, string> = {
  [GameLevel.EASY]: styles.level_easy,
  [GameLevel.MODERATE]: styles.level_moderate,
  [GameLevel.HARD]: styles.level_hard,
  [GameLevel.SUPER_HARD]: styles.level_super_hard,
};

function LevelSelectItem(props: LevelSelectItemProps) {
  const { gameLevel } = props;
  const { dispatch } = useContext(GlobalContext);

  const title = useMemo(() => LEVEL_TITLES[gameLevel], [gameLevel]);
  const style_class = useMemo(() => LEVEL_STYLES[gameLevel], [gameLevel]);

  const handleClick = () =>
    dispatch({
      type: GameConfigActionType.SET_GAME_LEVEL,
      payload: { gameLevel },
    });

  return (
    <div className={`${styles.level_select_item} ${style_class}`} onClick={handleClick}>
      <h3>{title}</h3>
    </div>
  );
}

export default LevelSelectItem;
