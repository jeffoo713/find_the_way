import { GameConfigActionType } from '@/types/context/GlobalContext/gameConfig/gameConfigReducer';
import { GameConfigState } from './gameConfig/gameConfigReducer';

export type GlobalState = {
  gameConfig: GameConfigState;
};

export type GlobalActionType = GameConfigActionType; // only GameConfigActionType at the moment, but can be extended
