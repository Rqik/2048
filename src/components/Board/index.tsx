import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { FC, Fragment, useEffect, useRef, useState, useCallback } from 'react';

import { dummyMatrix } from 'src/shared/helpers/dummy';
import {
  flatSortedMatrix,
  moveCellsUp,
  rotateMatrix90deg,
  updPosition,
} from 'src/shared/helpers/matrixMethods';
import useRootStore from 'src/store';
import { Game } from 'src/store/types';
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

const rowKey = '--row-size';
const colKey = '--col-size';

const generateTeal = (): number => (Math.random() > 0.33 ? 2 : 4);

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

const maxStartSize = randomInteger(4, 8);
const Board: FC<BoardProps> = (props) => {
  const { rootState } = useRootStore();
  const boardRef = useRef<HTMLDivElement>(null);
  const { rows, cols } = rootState;

  const [cellsCount, setCellsCount] = useState(rows * cols);
  const [startM, setStartM] = useState<Matrix>([]);
  const [cellsArr, setCellsArr] = useState(createNullArr(cellsCount));

  const [matrix, setMatrix] = useState(startM);

  const addTeal = (mtx: Matrix, minCount = 1): Matrix => {
    const result = mtx.flat().filter((cell) => cell.value === null);
    if (result.length !== 0) {
      const idArr: number[] = [];
      const count = randomInteger(minCount, 2);

      Array.from({ length: count }).forEach((): void => {
        const key = randomInteger(0, result.length - 1);
        idArr.push(result[key].id);
      });
      return mtx.map((el) =>
        el.map((cell) => {
          const nCell = { ...cell };
          if (idArr.includes(nCell.id)) {
            nCell.value = generateTeal();
            nCell.status = 'create';
          }
          return nCell;
        }),
      );
    }
    return mtx;
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
      rootState.setMaScore(rootState.addScore(score));
      setMatrix(newMatrix);
      setMatrix(addTeal(newMatrix, 1));
    },
    [matrix, addTeal],
  );

  const startGame = (): void => {
    setStartM(Array.from({ length: rows }, (_, y) => createRowCells(cols, y)));
  };

  const handleRestartClick = (): void => {
    startGame();
    rootState.restart();
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    setCellsArr(createNullArr(cellsCount));
    console.log('cellsArr', cellsArr);
  }, [cellsCount]);

  useEffect(() => {
    setCellsCount(rows * cols);
    startGame();
  }, [rows, cols]);

  useEffect(() => {
    setMatrix(addTeal(startM, 2));
  }, [startM]);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.style.setProperty(rowKey, `${rows}`);
      boardRef.current.style.setProperty(colKey, `${cols}`);
    }
  }, [rows, cols]);

  useEffect(() => {
    window.addEventListener('keydown', handleArrowClick);

    return () => {
      window.removeEventListener('keydown', handleArrowClick);
    };
  }, [handleArrowClick]);

  useEffect(() => {
    if (rootState.status === Game.RESTART) {
      startGame();
    }
  }, [rootState.status]);

  return (
    <div className={styles.board} ref={boardRef}>
      {rootState.status === Game.FINISH && (
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h2>Game over</h2>
            <button type="button" onClick={handleRestartClick}>
              restart <FontAwesomeIcon icon={faRotate} />
            </button>
          </div>
        </div>
      )}
      {cellsArr.map((_, x) => (
        // eslint-disable-next-line react/no-array-index-key
        <CellEmpty key={x} />
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

export default observer(Board);
