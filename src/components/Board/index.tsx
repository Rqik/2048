import { FC, Fragment, useEffect, useRef, useState, useCallback } from 'react';
import { dummyMatrix, dummyMatrix2 } from 'src/shared/helpers/dummy';
import {
  flatSortedMatrix,
  moveCellsUp,
  rotateMatrix,
  updPosition,
} from 'src/shared/helpers/matrixMethods';
import Cell from '../Cell';
import CellEmpty from '../CellEmpty';
import styles from './Board.module.scss';
import { CellProps, Matrix, RowCells } from './types';

rotateMatrix(dummyMatrix);
interface BoardProps {}
type KeyboardEvents = 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';

const rows = 4;
const cols = 4;
const ceilsCount = rows * cols;
const ceilsArr = Array.from({ length: ceilsCount }, () => '');
const rowKey = '--row-size';
const colKey = '--col-size';

const generateTeal = (): number => (Math.random() > 0.5 ? 2 : 4);

const randomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const createNullArr = (length: number): (null | number)[] =>
  Array.from({ length }, () => null);
const createRowCells = (length: number, y: number): RowCells =>
  Array.from({ length }, (__, x) => ({
    x,
    y,
    id: Number(`${y}${x}`),
    value: null,
  }));
const startM = Array.from({ length: rows }, (_, y) => createRowCells(cols, y));
// console.log('startM', startM);

const maxStartSize = randomInteger(4, 8);
const Board: FC<BoardProps> = (props) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const siz = useRef(2);

  const [matrix, setMatrix] = useState(
    Array.from({ length: rows }, () => createNullArr(cols)),
  );

  // const matrix2 = useRef<CellProp[][]>(
  //   Array.from({ length: rows }, (_, y) => createCells(cols, y)),
  // );
  const [matrix2, setMatrix2] = useState<Matrix>(dummyMatrix2);
  // console.log('startM', startM);

  // useEffect(() => {
  //   Array.from({ length: maxStartSize }, () => '').forEach(() => {
  //     const x = randomInteger(0, cols - 1);
  //     const y = randomInteger(0, rows - 1);
  //     setMatrix((state) => {
  //       const result = [...state];
  //       result[y][x] = generateTeal();
  //       return result;
  //     });
  //   });
  // }, []);
  // useEffect(() => {
  //   Array.from({ length: maxStartSize }, () => '').forEach(() => {
  //     const x = randomInteger(0, cols - 1);
  //     const y = randomInteger(0, rows - 1);
  //     setMatrix2((state) => {
  //       const result = [...state];
  //       result[y][x].value = generateTeal();
  //       return result;
  //     });
  //   });
  // }, []);
  // useEffect(() => {
  //   Array.from({ length: maxStartSize }, () => '').forEach(() => {
  //     const x = randomInteger(0, cols - 1);
  //     const y = randomInteger(0, rows - 1);

  //     const result = [...matrix2];
  //     result[y][x].value = generateTeal();
  //     setMatrix2(result);
  //   });
  // }, []);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.style.setProperty(rowKey, `${rows}`);
      boardRef.current.style.setProperty(colKey, `${cols}`);
    }
  }, []);
  // console.log(matrix2);

  const moveArrayUp = useCallback((matr: CellProps[][]): CellProps[][] => {
    const newMatrix = matr;
    // console.log(matr);

    const a = newMatrix.map((row, y, arr) => {
      let prevArr = row;
      let currentArr = row;
      if (y !== 0) {
        prevArr = arr[y - 1];
        currentArr = currentArr.map((el, x) => {
          if (el.value === null) return el;
          let i = y - 1;
          while (arr[i][x].value === null && i > 0) {
            i -= 1;
          }
          // console.log(i, y, x);

          const findedVal = arr[i][x].value;
          // console.log(findedVal);

          if (findedVal === null) {
            return { ...el, y: i, value: el.value };
          }

          return { ...el, y: i, value: findedVal + el.value };
        });
      }
      // console.log('currentArr', currentArr);

      // const arr = row.map(() => {});
      return currentArr;
    });
    return a;
  }, []);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const direM = (): CellProp[][] => {
  //   const s = structuredClone(matrix2).map((row) =>
  //     row.map((el) => ({ ...el, y: el.y - 1 })),
  //   );
  //   return s;
  // };
  const handleArrowDown = useCallback(
    (e: KeyboardEvent): void => {
      const event: KeyboardEvents | string = e.key;
      let newMatrix = matrix2;
      siz.current += 6;
      switch (event) {
        case 'ArrowUp': {
          newMatrix = updPosition(moveCellsUp(matrix2));
          setMatrix2(newMatrix);
          break;
        }
        case 'ArrowDown': {
          newMatrix = updPosition(
            rotateMatrix(
              rotateMatrix(moveCellsUp(rotateMatrix(rotateMatrix(matrix2)))),
            ),
          );
          break;
        }
        case 'ArrowLeft': {
          newMatrix = updPosition(
            rotateMatrix(
              rotateMatrix(rotateMatrix(moveCellsUp(rotateMatrix(matrix2)))),
            ),
          );
          setMatrix2(newMatrix);
          break;
        }
        case 'ArrowRight': {
          newMatrix = updPosition(
            rotateMatrix(
              moveCellsUp(rotateMatrix(rotateMatrix(rotateMatrix(matrix2)))),
            ),
          );
          setMatrix2(newMatrix);
          break;
        }
        default:
          break;
      }
      setMatrix2(newMatrix);
    },
    [matrix2],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleArrowDown);

    return () => {
      window.removeEventListener('keydown', handleArrowDown);
    };
  }, [handleArrowDown]);

  // console.log(siz.current);
  // console.log(matrix2);
  return (
    <div className={styles.board} ref={boardRef}>
      {ceilsArr.map((_, x) => (
        // eslint-disable-next-line react/no-array-index-key
        <CellEmpty key={x} />
      ))}
      {/* {matrix.map((row, y) =>
        row.map((val, x) => {
          // eslint-disable-next-line react/no-array-index-key
          if (val === null) return <Fragment key={`${x}_${y}`} />;
          // eslint-disable-next-line react/no-array-index-key
          return <Cell key={`${x}_${y}`} value={val} x={x} y={y} />;
        }),
      )} */}
      {flatSortedMatrix(matrix2).map(({ value, x, y, id }) => {
        // eslint-disable-next-line react/no-array-index-key
        if (value === null) return <Fragment key={id} />;
        // eslint-disable-next-line react/no-array-index-key
        return <Cell key={id} value={value} x={x} y={y} />;
      })}
    </div>
  );
};

export default Board;
