import React, { useReducer } from 'react';
import { INITIAL_GLOBAL_STATE, GlobalContext } from './lobalContext';
import { globalReducer } from './reducers/globalReducer';

type GlobalProviderProps = {
  children: React.ReactNode;
};

function GlobalContextProvider(props: GlobalProviderProps) {
  const [state, dispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>{props.children}</GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
