import { createContext } from 'react';

const INITIAL_CONTEXT_VALUE = {
  widthSize: 0,
  board: [],
  temporaryShowWay: () => {},
  remainingShowWayCount: 0,
  attemptCount: 0,
  restartBoard: () => {},
  handelClickCell: () => {},
  success: false,
  displayingWay: false,
  shouldCellLightUp: () => false,
  isWrongCell: () => false,
  showFinishFlag: () => false,
};

export const BoardContext = createContext<BoardState>(INITIAL_CONTEXT_VALUE);

type BoardContextProviderProps = {
  children: React.ReactNode;
} & BoardState;

function BoardContextProvider(props: BoardContextProviderProps) {
  return <BoardContext.Provider value={props}>{props.children}</BoardContext.Provider>;
}

export default BoardContextProvider;
