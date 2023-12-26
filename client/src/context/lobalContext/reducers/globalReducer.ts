import { GlobalActionType, GlobalState } from '@/types/ontext/GlobalContext/GlobalContext';
import { gameConfigReducer } from './gameConfig/gameConfigReducer';

export const globalReducer = (state: GlobalState, action: GlobalActionType): GlobalState => ({
  gameConfig: gameConfigReducer(state.gameConfig, action),
});
