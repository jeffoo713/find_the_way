type BoardState = {
  widthSize: number;
  board: Board;
  temporaryShowWay: () => void;
  remainingShowWayCount: number;
  attemptCount: number;
  restartBoard: React.DispatchWithoutAction;
  handelClickCell: (idx: number) => void;
  success: boolean;
  displayingWay: boolean;
  shouldCellLightUp: (cellIdx: number) => boolean;
  isWrongCell: (cellIdx: number) => boolean;
};
