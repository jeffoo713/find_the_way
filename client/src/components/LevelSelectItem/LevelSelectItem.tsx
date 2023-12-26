import { useContext, useMemo } from 'react';
import styles from './levelSelectItem.module.scss';
import { GlobalContext } from '../../context/GlobalContext/GlobalContext';
import { GameConfigActionType, GameLevel } from '@/enums/gameConfig';
import { GAME_LEVEL_STYLES, GAME_LEVEL_TITLES } from '../../constants';

type LevelSelectItemProps = {
  gameLevel: Exclude<GameLevel, GameLevel.NULL>;
};

function LevelSelectItem(props: LevelSelectItemProps) {
  const { gameLevel } = props;
  const { dispatch } = useContext(GlobalContext);

  const title = useMemo(() => GAME_LEVEL_TITLES[gameLevel], [gameLevel]);
  const style_class = useMemo(() => GAME_LEVEL_STYLES(styles)[gameLevel], [gameLevel]);

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
