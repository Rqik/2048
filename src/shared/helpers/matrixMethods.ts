import { CellProps, Matrix, RowCells } from '@/components/Board/types';

const rotateMatrix = (matrix: Matrix): Matrix =>
  matrix[0].map((_, x) => matrix.map((row) => row[x]).reverse());

const updPosition = (matrix: Matrix): Matrix =>
  matrix.map((row, y) => row.map((cell, x) => ({ ...cell, x, y })));

const moveCellsUp = (matrix: Matrix): Matrix => {
  const cloneMatrix = structuredClone(matrix) as Matrix;
  console.log(matrix);

  const newMatrix: Matrix = [];
  cloneMatrix.forEach((row, y) => {
    if (y === 0) {
      newMatrix[0] = row;
    } else {
      row.forEach((cell, x) => {
        let i = y - 1;
        // if (cell.id === 23) {
        //   console.log(cloneMatrix[y][x]);
        //   console.log(cloneMatrix[i][x]);
        //   console.log(y, x, i);
        // }
        while (i > 0 && cloneMatrix[i][x].value === null) {
          i -= 1;
        }

        const prevCell = structuredClone(cloneMatrix[i][x]) as CellProps;
        const currentCell = structuredClone(cell) as CellProps;
        // console.log(cloneMatrix[i][x]);

        // if (y === 3 && x === 0) {
        //   console.log(cloneMatrix[i][x]);
        //   console.log(cloneMatrix[y][x]);
        //   console.log(y, x);
        // }
        if (prevCell.value === null) {
          cloneMatrix[i][x] = currentCell;
          cloneMatrix[y][x] = prevCell;
        }

        if (
          typeof currentCell.value === 'number' &&
          typeof prevCell.value === 'number'
        ) {
          if (prevCell.value === currentCell.value) {
            console.log(prevCell, currentCell);

            cloneMatrix[i][x] = currentCell;
            cloneMatrix[i][x].value = currentCell.value * 2;
            cloneMatrix[y][x] = prevCell;
            cloneMatrix[y][x].value = null;
            // cloneMatrix[y][x].value = currentCell.value * 2;}
          } else {
            const emptyCell = structuredClone(cloneMatrix[i + 1][x]);
            cloneMatrix[i + 1][x] = currentCell;
            cloneMatrix[y][x] = emptyCell;
          }
        }
      });
    }
  });

  return cloneMatrix;
};
const flatSortedMatrix = (matrix: Matrix): RowCells =>
  matrix.flat().sort(({ id: a }, { id: b }) => a - b);

// console.log(rotateMatrix(dummyMatrix));

export { rotateMatrix, updPosition, moveCellsUp, flatSortedMatrix };
