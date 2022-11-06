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
import useRootStore from 'src/store';
import Cell from '../Cell';
import CellEmpty from '../CellEmpty';
import styles from './Board.module.scss';
import { Matrix, RowCells } from './types';

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
  const { rootState } = useRootStore();
  const boardRef = useRef<HTMLDivElement>(null);
  const siz = useRef(2);

  const [matrix, setMatrix] = useState(startM);
  // console.log(startM);

  // const matrix2 = useRef<CellProp[][]>(
  //   Array.from({ length: rows }, (_, y) => createCells(cols, y)),
  // );
  // const [matrix, setMatrix2] = useState<Matrix>(dummyMatrix3);

  const addTeal = (mtx: Matrix, limit = 0): Matrix => {
    let i = 0;
    const result = [...mtx];
    Array.from({ length: maxStartSize }, () => '').forEach(() => {
      if (limit === 0 || i <= limit) {
        i += 1;
        const x = randomInteger(0, cols - 1);
        const y = randomInteger(0, rows - 1);
        console.log('asdjklh');
        const cell = result[y][x];
        if (cell.value === null) {
          cell.value = generateTeal();
          cell.status = 'create';
        }
      }
    });
    return result;
  };

  const handleArrowClick = useCallback(
    (e: KeyboardEvent): void => {
      const event: KeyboardEvents | string = e.key;
      let newMatrix = matrix;
      let score = 0;

      switch (event) {
        case 'ArrowUp': {
          const { matrix: m, score: s } = moveCellsUp(matrix);
          newMatrix = updPosition(m);
          score = s;
          break;
        }
        case 'ArrowRight': {
          const { matrix: m, score: s } = moveCellsUp(
            rotateMatrix90deg(rotateMatrix90deg(rotateMatrix90deg(matrix))),
          );
          score = s;
          newMatrix = updPosition(rotateMatrix90deg(m));
          break;
        }
        case 'ArrowDown': {
          const { matrix: m, score: s } = moveCellsUp(
            rotateMatrix90deg(rotateMatrix90deg(matrix)),
          );
          score = s;
          newMatrix = updPosition(rotateMatrix90deg(rotateMatrix90deg(m)));
          break;
        }
        case 'ArrowLeft': {
          const { matrix: m, score: s } = moveCellsUp(
            rotateMatrix90deg(matrix),
          );
          score = s;
          newMatrix = updPosition(
            rotateMatrix90deg(rotateMatrix90deg(rotateMatrix90deg(m))),
          );
          break;
        }
        default:
          break;
      }
      rootState.addScore(score);

      setMatrix(newMatrix);
      setTimeout(() => {
        setMatrix(addTeal(newMatrix, 30));
      }, 500);
    },
    [matrix, addTeal],
  );
  console.log('-----------', matrix);

  useEffect(() => {
    setMatrix(addTeal(matrix, 30));
    // addTeal(3);
    // addTeal(3);
  }, []);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.style.setProperty(rowKey, `${rows}`);
      boardRef.current.style.setProperty(colKey, `${cols}`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleArrowClick);

    return () => {
      window.removeEventListener('keydown', handleArrowClick);
    };
  }, [handleArrowClick]);

  return (
    <div className={styles.board} ref={boardRef}>
      {cellsArr.map((_, x) => (
        // eslint-disable-next-line react/no-array-index-key
        <CellEmpty key={x}> {x}</CellEmpty>
      ))}

      {flatSortedMatrix(matrix).map((cell, i) => {
        const { value, id, status, linkedCellId } = cell;
        if (value === null && status !== 'stop') return <Fragment key={id} />;
        if (status === 'stop')
          return (
            <Cell
              key={id}
              {...cell}
              connectCell={matrix
                .flat()
                .find(({ id: uId }) => linkedCellId === uId)}
            />
          );
        return <Cell key={id} {...cell} />;
      })}
    </div>
  );
};

export default Board;
