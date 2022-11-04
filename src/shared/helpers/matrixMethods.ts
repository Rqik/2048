/* eslint-disable no-param-reassign */
import { CellProps, Matrix, RowCells } from '@/components/Board/types';
import { testRow2 } from './dummy';

const rotateMatrix90deg = (matrix: Matrix): Matrix =>
  matrix[0].map((_, x) => matrix.map((row) => row[x]).reverse());

const transformRowToColsMatrix = (matrix: Matrix): Matrix =>
  matrix[0].map((_, x) => matrix.map((row) => row[x]));

const updPosition = (matrix: Matrix): Matrix =>
  matrix.map((row, y) => row.map((cell, x) => ({ ...cell, x, y })));

const testCol = [
  {
    x: 0,
    y: 0,
    id: 0,
    value: 2,
  },
  {
    x: 1,
    y: 0,
    id: 1,
    value: 2,
  },
  {
    x: 2,
    y: 0,
    id: 2,
    value: null,
  },
  {
    x: 3,
    y: 0,
    id: 3,
    value: null,
  },
];

const resetStatus = (row: RowCells): RowCells =>
  row.map((cell) => ({ ...cell, status: null } as CellProps));

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

// [1,0,1,0]
// [1,1,0,0]
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

const moveCellsUp = (matrix: Matrix): Matrix => {
  const colsMatrix = transformRowToColsMatrix(
    structuredClone(matrix.map(resetStatus)),
  ).map(sortRow);

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

        col[nextX] = currentCell;
        col[x] = nextCell;
      }

      // const index = getIndexOfNearestNonEmpty(col, x);
    });
    colsMatrix[y] = sortRow(col);
    // s[y] = newCol;
  });

  console.log(
    'transformRowToColsMatrix colsMatrix= ',
    transformRowToColsMatrix(colsMatrix),
  );

  console.log(
    'cloneMatrix = ',
    transformRowToColsMatrix(transformRowToColsMatrix(colsMatrix)),
  );
  return transformRowToColsMatrix(colsMatrix);
};

const flatSortedMatrix = (matrix: Matrix): RowCells =>
  matrix.flat().sort(({ id: a }, { id: b }) => a - b);

// console.log(rotateMatrix(dummyMatrix));

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

// cloneMatrix.forEach((row, y) => {
//   // console.log(row);

//   if (y === 0) {
//     newMatrix[0] = row;
//   } else {
//     row.forEach((cell, x) => {
//       let i = y - 1;
//       // if (cell.id === 23) {
//       //   console.log(cloneMatrix[y][x]);
//       //   console.log(cloneMatrix[i][x]);
//       //   console.log(y, x, i);
//       // }
//       while (i > 0 && cloneMatrix[i][x].value === null) {
//         i -= 1;
//       }

//       const prevCell = structuredClone(cloneMatrix[i][x]) as CellProps;
//       const currentCell = structuredClone(cell) as CellProps;
//       // console.log('prevCell', prevCell, currentCell);

//       // console.log(cloneMatrix[i][x]);

//       // if (y === 3 && x === 0) {
//       //   console.log(cloneMatrix[i][x]);
//       //   console.log(cloneMatrix[y][x]);
//       //   console.log(y, x);
//       // }

//       if (prevCell.value === null) {
//         cloneMatrix[i][x] = currentCell;
//         cloneMatrix[y][x] = prevCell;
//       }

//       if (
//         typeof currentCell.value === 'number' &&
//         typeof prevCell.value === 'number'
//       ) {
//         if (prevCell.value === currentCell.value) {
//           // console.log(prevCell, currentCell);
//           // TODO: поправить
//           cloneMatrix[i][x] = currentCell;
//           cloneMatrix[i][x].value = currentCell.value * 2;
//           cloneMatrix[i][x].status = null;

//           cloneMatrix[y][x] = prevCell;
//           cloneMatrix[y][x].value = null;
//           cloneMatrix[y][x].status = 'moving';
//           // cloneMatrix[y][x].value = currentCell.value * 2;}
//         } else {
//           const emptyCell = structuredClone(cloneMatrix[i + 1][x]);
//           cloneMatrix[i + 1][x] = currentCell;
//           cloneMatrix[y][x] = emptyCell;
//           // console.log('emptyCell', emptyCell);
//         }
//       }
//     });
//   }
// });
// return cloneMatrix;

//  -------

// let prevCell = structuredClone(col[nextX]); // ближайший не пустой
// let copyPrevCell = structuredClone(prevCell);

// let currentCell = structuredClone(cell);

// if (prevCell.value === null && prevCell.status === null) {
//   col[nextX].status = 'inner';
//   cell.status = 'moving-start';

//   prevCell = structuredClone(col[nextX]);
//   copyPrevCell = structuredClone(prevCell);

//   prevCell = {
//     ...prevCell,
//     x: currentCell.x,
//     y: currentCell.y,
//     status: 'inner',
//   };

//   currentCell = {
//     ...currentCell,
//     x: copyPrevCell.x,
//     y: copyPrevCell.y,
//     status: 'moving-start',
//   };

//   col[nextX] = currentCell;
//   col[x] = prevCell;
//   return;
// }

// if (prevCell.status === null && prevCell.value === currentCell.value) {
//   // col[nextX].status = 'inner';
//   // cell.status = 'moving';

//   // prevCell = {
//   //   ...prevCell,
//   //   x: currentCell.x,
//   //   y: currentCell.y,
//   //   status: 'inner',
//   //   value: null,
//   // };

//   // currentCell = {
//   //   ...currentCell,
//   //   x: copyPrevCell.x,
//   //   y: copyPrevCell.y,
//   //   value: (currentCell.value *= 2),
//   //   status: 'moving',
//   // };

//   // col[nextX] = currentCell;
//   // col[x] = prevCell;

//   // newCol[index] = currentCell;
//   // newCol[x] = prevCell;
//   return;
// }

// if (prevCell.status === 'moving') {
//   // newCol[x] = cell;
//   // const empty = structuredClone(col[index + 1]);
//   // cell.status = 'moving-go';
//   // prevCell = {
//   //   ...empty,
//   //   status: 'inner',
//   // };

//   // currentCell = {
//   //   ...cell,
//   //   status: 'moving-go',
//   // };

//   // col[index + 1] = currentCell;
//   // col[x] = prevCell;
//   return;
// }

// if (prevCell.status === 'moving-start' && prevCell.value === cell.value) {
//   // newCol[x] = cell;
//   // const empty = structuredClone(col[nextX + 1]);

//   // col[nextX + 1] = {
//   //   ...cell,
//   //   status: 'moving-go',
//   // };

//   // col[x] = {
//   //   ...empty,
//   //   status: 'inner',
//   // };
//   return;
// }

// if (prevCell.status === null) {
//   // console.log(prevCell);
//   // const indexNull = getIndexOfDistantEmpty(col, x);
//   // col[indexNull].status = 'inner';
//   // cell.status = 'moving-start';
//   // // if (y === index + 1) {
//   // //   return cell;
//   // // }
//   // console.log();
//   // prevCell = structuredClone(col[indexNull]);
//   // copyPrevCell = structuredClone(prevCell);
//   // prevCell = {
//   //   ...prevCell,
//   //   x: currentCell.x,
//   //   y: currentCell.y,
//   //   status: 'inner',
//   // };
//   // currentCell = {
//   //   ...currentCell,
//   //   x: copyPrevCell.x,
//   //   y: copyPrevCell.y,
//   //   status: 'moving-start',
//   // };
//   // col[index] = currentCell;
//   // col[x] = prevCell;
// }
