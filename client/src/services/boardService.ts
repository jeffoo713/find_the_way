class BoardService {
  private widthSize: number;

  constructor(widthSize: number) {
    this.widthSize = widthSize;
  }

  private getStartCellIndex() {
    return Math.floor(Math.random() * this.widthSize);
  }

  private getEmptyBoard() {
    const boardRow: BoardRow = new Array<0 | 1>(this.widthSize).fill(0);
    const emptyBoard = new Array<BoardRow>(this.widthSize).fill(boardRow);

    return emptyBoard;
  }

  private shouldTurnLeft(prevLastCellIndex: number, prevTurnLeft: boolean | null) {
    return (
      (prevLastCellIndex !== 0 && prevTurnLeft !== false && Math.random() > 0.4) ||
      (prevLastCellIndex === this.widthSize - 1 && Math.random() > 0.35)
    );
  }

  private isTurningSameDirection(turnDirectionNow: boolean, turnDirectionBefore: boolean | null) {
    return (
      (turnDirectionNow && turnDirectionBefore === false) ||
      (!turnDirectionNow && turnDirectionBefore === true)
    );
  }

  private processGoingSide(
    isTurningLeft: boolean,
    totalTurnSteps: number,
    prevLastCellIndex: number,
    plainRow: BoardRow,
    sequence: number[],
    rowIndex: number,
  ) {
    for (let j = 1; j < totalTurnSteps + 1; j += 1) {
      const indexToProceed = isTurningLeft ? prevLastCellIndex - j : prevLastCellIndex + j;

      const isValidIndex = isTurningLeft
        ? indexToProceed >= 0
        : indexToProceed <= this.widthSize - 1;

      if (isValidIndex) {
        plainRow[indexToProceed] = 1;
        sequence.push(this.widthSize * rowIndex + indexToProceed);
      }
    }
  }

  createBoard(): [Board, number[]] {
    const emptyBoard = this.getEmptyBoard();

    const boardToStart: Board = [];
    const sequence: number[] = [];

    let prevLastCellIndex: number;
    let prevTurnLeft: boolean | null;

    emptyBoard.forEach((row, i) => {
      if (i === 0) {
        const startCellIndex = this.getStartCellIndex();
        prevLastCellIndex = startCellIndex;
      }

      const plainRow = new Array<0 | 1>(this.widthSize).fill(0);
      plainRow[prevLastCellIndex] = 1;
      sequence.push(this.widthSize * i + prevLastCellIndex);

      const isTurningLeft = this.shouldTurnLeft(prevLastCellIndex, prevTurnLeft);

      if (this.isTurningSameDirection(isTurningLeft, prevTurnLeft)) {
        boardToStart[i] = [...plainRow];
        prevTurnLeft = null;
        return;
      }

      const totalTurnSteps = Math.floor(Math.random() * 3) + 1; // 1 | 2 | 3

      if (isTurningLeft) {
        prevTurnLeft = true;
        this.processGoingSide(
          isTurningLeft,
          totalTurnSteps,
          prevLastCellIndex,
          plainRow,
          sequence,
          i,
        );
        prevLastCellIndex = Math.max(prevLastCellIndex - totalTurnSteps, 0);
      } else {
        prevTurnLeft = false;
        this.processGoingSide(
          isTurningLeft,
          totalTurnSteps,
          prevLastCellIndex,
          plainRow,
          sequence,
          i,
        );
        prevLastCellIndex = Math.min(prevLastCellIndex + totalTurnSteps, this.widthSize - 1);
      }

      boardToStart[i] = [...plainRow];
      return;
    });

    console.log('board created: ', boardToStart);
    console.log('sequence: ', sequence);

    // if (sequence.length < 15) return this.createBoard();

    return [boardToStart, sequence];
  }
}

export default BoardService;
