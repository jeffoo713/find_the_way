import { GameLevel } from '@/enums/gameConfig';
import { GlobalActionType, GlobalState } from '@/types/Context/GlobalContext/GlobalContext';
import React, { createContext } from 'react';

export const INITIAL_GLOBAL_STATE: GlobalState = {
  gameConfig: { gameLevel: GameLevel.NULL },
};

const INITIAL_CONTEXT_VALUE = {
  state: INITIAL_GLOBAL_STATE,
  dispatch: () => null,
};

export const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<GlobalActionType>;
}>(INITIAL_CONTEXT_VALUE);
