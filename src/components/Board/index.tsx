import { FC, Fragment, useEffect, useRef, useState, useCallback } from 'react';
import {
  dummyMatrix,
  dummyMatrix2,
  dummyMatrix3,
} from 'src/shared/helpers/dummy';
import {
  flatSortedMatrix,
  moveCellsUp,
  rotateMatrix90deg,
  updPosition,
} from 'src/shared/helpers/matrixMethods';
import Cell from '../Cell';
import CellEmpty from '../CellEmpty';
import styles from './Board.module.scss';
import { CellProps, Matrix, RowCells } from './types';

rotateMatrix90deg(dummyMatrix);
interface BoardProps {}
type KeyboardEvents = 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';

enum Status {
  MOVING = 'MOVING',
  COMPLETED = 'COMPLETED',
}

const statusAnimation = Status.COMPLETED;
const statusVector: KeyboardEvents = 'ArrowDown';

const durationAnimation = 250; // ms
const rows = 4;
const cols = 4;
const cellsCount = rows * cols;
const cellsArr = Array.from({ length: cellsCount }, () => '');
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
    status: null,
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
  const [matrix2, setMatrix2] = useState<Matrix>(dummyMatrix3);
  // console.log('startM', startM);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.style.setProperty(rowKey, `${rows}`);
      boardRef.current.style.setProperty(colKey, `${cols}`);
    }
  }, []);

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
            rotateMatrix90deg(
              rotateMatrix90deg(
                moveCellsUp(rotateMatrix90deg(rotateMatrix90deg(matrix2))),
              ),
            ),
          );
          break;
        }
        case 'ArrowLeft': {
          newMatrix = updPosition(
            rotateMatrix90deg(
              rotateMatrix90deg(
                rotateMatrix90deg(moveCellsUp(rotateMatrix90deg(matrix2))),
              ),
            ),
          );
          setMatrix2(newMatrix);
          break;
        }
        case 'ArrowRight': {
          newMatrix = updPosition(
            rotateMatrix90deg(
              moveCellsUp(
                rotateMatrix90deg(
                  rotateMatrix90deg(rotateMatrix90deg(matrix2)),
                ),
              ),
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
  console.log('------------------------', matrix2);
  return (
    <div className={styles.board} ref={boardRef}>
      {cellsArr.map((_, x) => (
        // eslint-disable-next-line react/no-array-index-key
        <CellEmpty key={x}> {x}</CellEmpty>
      ))}
      {/* {matrix.map((row, y) =>
        row.map((val, x) => {
          // eslint-disable-next-line react/no-array-index-key
          if (val === null) return <Fragment key={`${x}_${y}`} />;
          // eslint-disable-next-line react/no-array-index-key
          return <Cell key={`${x}_${y}`} value={val} x={x} y={y} />;
        }),
      )} */}
      {flatSortedMatrix(matrix2).map(({ value, x, y, id, status }) => {
        // eslint-disable-next-line react/no-array-index-key
        if (value === null) return <Fragment key={id} />;
        // eslint-disable-next-line react/no-array-index-key
        return (
          <Cell key={id} value={value} x={x} y={y} id={id} status={status} />
        );
      })}
    </div>
  );
};

export default Board;
