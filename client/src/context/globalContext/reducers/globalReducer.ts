import { GlobalActionType, GlobalState } from '@/types/stateManagement/globalContext';
import { gameConfigReducer } from './gameConfig/gameConfigReducer';

export const globalReducer = (state: GlobalState, action: GlobalActionType): GlobalState => ({
  gameConfig: gameConfigReducer(state.gameConfig, action),
});
