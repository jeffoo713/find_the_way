import { GameLevel, GameConfigActionType as GameConfigActionTypeEnum } from '@/enums/gameConfig';
import { GameConfigActionType } from '@/types/context/GlobalContext/gameConfig/gameConfigReducer';
import { GameConfigState } from '@/types/context/GlobalContext/gameConfig/gameConfigReducer';

const INITIAL_GAME_CONFIG_STATE: GameConfigState = {
  gameLevel: GameLevel.NULL,
};

export const gameConfigReducer = (
  state: GameConfigState = INITIAL_GAME_CONFIG_STATE,
  action: GameConfigActionType,
): GameConfigState => {
  switch (action.type) {
    case GameConfigActionTypeEnum.SET_GAME_LEVEL: {
      return { ...state, ...action.payload };
    }
    default:
      return { ...state };
  }
};
