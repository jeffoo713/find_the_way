import { createContext } from 'react';

const INITIAL_CONTEXT_VALUE = {
  widthSize: null,
  board: null,
  temporaryShowWay: null,
  remainingShowWayCount: null,
  attemptCount: null,
  restartBoard: null,
  handelClickCell: null,
  success: null,
  displayingWay: null,
  shouldCellLightUp: null,
};

export const BoardContext = createContext<NullableBoardState>(INITIAL_CONTEXT_VALUE);

type BoardContextProviderProps = {
  children: React.ReactNode;
} & NullableBoardState;

function BoardContextProvider(props: BoardContextProviderProps) {
  return <BoardContext.Provider value={props}>{props.children}</BoardContext.Provider>;
}

export default BoardContextProvider;
