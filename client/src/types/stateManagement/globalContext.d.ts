import { GameConfigActionType } from '@/types/stateManagement/gameConfig/gameConfigReducer';
import { GameConfigState } from './gameConfig/gameConfigReducer';

type GlobalState = {
  gameConfig: GameConfigState;
};

type GlobalActionType = GameConfigActionType; // only GameConfigActionType at the moment, but can be extended
