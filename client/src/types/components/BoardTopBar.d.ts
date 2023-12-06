type BoardTopBarComp = {
  attemptCount: number;
  remainingShowWayCount: number;
  temporaryShowWay: () => void;
  restartBoard: React.DispatchWithoutAction;
  success: boolean;
  displayingWay: boolean;
};
