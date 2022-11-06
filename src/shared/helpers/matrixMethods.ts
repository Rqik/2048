/* eslint-disable no-param-reassign */
import { CellProps, Matrix, RowCells } from '@/components/Board/types';

const rotateMatrix90deg = (matrix: Matrix): Matrix =>
  matrix[0].map((_, x) => matrix.map((row) => row[x]).reverse());

const transformRowToColsMatrix = (matrix: Matrix): Matrix =>
  matrix[0].map((_, x) => matrix.map((row) => row[x]));

const updPosition = (matrix: Matrix): Matrix =>
  matrix.map((row, y) => row.map((cell, x) => ({ ...cell, x, y })));

const resetStatus = (row: RowCells): RowCells =>
  row.map(
    (cell) => ({ ...cell, status: null, linkedCellId: null } as CellProps),
  );

const getIndexOfNearestNonEmpty = (
  col: RowCells,
  currentIndex: number,
): number => {
  let i = currentIndex - 1;
  while (i > 0 && col[i].value === null) {
    i -= 1;
  }
  return i;
};

// ближайший не тронутый пустой
const getIndexOfDistantEmpty = (col: RowCells, currentPos: number): number => {
  let i = 0;
  while (i < currentPos && (col[i].status !== null || col[i].value !== null)) {
    i += 1;
  }
  return i;
};

const findNearestNonEmptyAndClearStatus = (
  row: RowCells,
  startWith: number,
): CellProps | null =>
  row.find(
    ({ value, status }, i) =>
      i > startWith && value !== null && status === null,
  ) || null;

// [1,0,1,0] => [1,1,0,0]
const sortRow = (row: RowCells): RowCells => {
  const result: RowCells = [];
  const nullElements: RowCells = [];
  let finish = false;
  row.forEach((cell, i) => {
    if (finish) return;
    if (cell.value !== null) {
      result.push(cell);
      return;
    }
    const copy = row.slice(i);
    const index = copy.findIndex(({ value }) => value !== null);

    if (index === -1) {
      nullElements.push(...copy);
      finish = true;
      return;
    }

    const noEmptyCell = row[index + i];
    const { x: nX, y: nY } = cell;
    const { x: empX, y: empY } = noEmptyCell;
    cell.x = empX;
    cell.y = empY;
    noEmptyCell.x = nX;
    noEmptyCell.y = nY;
    nullElements.push(cell);
  });
  return [...result, ...nullElements];
};

// [1,0,1,0] => [1,1,1,0]
// [1,1,0,0]    [1,0,0,0]
const moveCellsUp = (matrix: Matrix): { matrix: Matrix; score: number } => {
  const colsMatrix = transformRowToColsMatrix(
    structuredClone(matrix.map(resetStatus)),
  ).map(sortRow);
  let score = 0;
  colsMatrix.forEach((col, y) => {
    const lastIndex = col.length - 1;
    col.forEach((cell, x) => {
      const breakFunc = cell.value === null || x === lastIndex;
      if (breakFunc) {
        return;
      }
      const nextX = x + 1;

      if (col[nextX].value === cell.value) {
        const nextCell = structuredClone(col[nextX]);
        const currentCell = structuredClone(cell);

        const { x: posX, y: posY } = currentCell;
        const { x: nPosX, y: nPosY } = nextCell;

        nextCell.x = posX;
        nextCell.y = posY;
        nextCell.value *= 2;
        nextCell.status = 'moving';

        currentCell.x = nPosX;
        currentCell.y = nPosY;
        currentCell.value = null;
        currentCell.status = 'stop';
        currentCell.linkedCellId = nextCell.id;

        score += nextCell.value;
        col[nextX] = currentCell;
        col[x] = nextCell;
      }

      // const index = getIndexOfNearestNonEmpty(col, x);
    });
    colsMatrix[y] = sortRow(col);
  });

  return { matrix: transformRowToColsMatrix(colsMatrix), score };
};

const flatSortedMatrix = (matrix: Matrix): RowCells =>
  matrix.flat().sort(({ id: a }, { id: b }) => a - b);

export {
  rotateMatrix90deg,
  updPosition,
  moveCellsUp,
  flatSortedMatrix,
  resetStatus,
  getIndexOfNearestNonEmpty,
  getIndexOfDistantEmpty,
  findNearestNonEmptyAndClearStatus,
};
