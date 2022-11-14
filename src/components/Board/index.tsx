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
import { useSwipeable } from 'react-swipeable';
import Cell from '../Cell';
import CellEmpty from '../CellEmpty';
import styles from './Board.module.scss';
import { Matrix, RowCells } from './types';

rotateMatrix90deg(dummyMatrix);
interface BoardProps {}

type CustomEvents = 'Down' | 'Up' | 'Left' | 'Right';

const ArrowEventsMap: Record<string, CustomEvents> = {
  ArrowDown: 'Down',
  ArrowUp: 'Up',
  ArrowLeft: 'Left',
  ArrowRight: 'Right',
};
enum Status {
  MOVING = 'MOVING',
  COMPLETED = 'COMPLETED',
}

const statusAnimation = Status.COMPLETED;
const statusVector: CustomEvents = 'Down';

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
  const moveMatrix = (
    event: CustomEvents,
  ): { score: number; matrix: Matrix } => {
    let newMatrix = matrix;
    let score = 0;

    switch (event) {
      case 'Up': {
        const { matrix: m, score: s } = moveCellsUp(matrix);
        newMatrix = updPosition(m);
        score = s;
        break;
      }
      case 'Right': {
        const { matrix: m, score: s } = moveCellsUp(
          rotateMatrix90deg(rotateMatrix90deg(rotateMatrix90deg(matrix))),
        );
        score = s;
        newMatrix = updPosition(rotateMatrix90deg(m));
        break;
      }
      case 'Down': {
        const { matrix: m, score: s } = moveCellsUp(
          rotateMatrix90deg(rotateMatrix90deg(matrix)),
        );
        score = s;
        newMatrix = updPosition(rotateMatrix90deg(rotateMatrix90deg(m)));
        break;
      }
      case 'Left': {
        const { matrix: m, score: s } = moveCellsUp(rotateMatrix90deg(matrix));
        score = s;
        newMatrix = updPosition(
          rotateMatrix90deg(rotateMatrix90deg(rotateMatrix90deg(m))),
        );
        break;
      }
      default:
        break;
    }
    return { score, matrix: newMatrix };
  };
  const checkLengthValuesMatrix = (matrixV: Matrix): boolean =>
    matrixV.flat().filter(({ value }) => value !== null).length ===
    cellsArr.length;

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

  const matrixEventRunner = (event: CustomEvents): void => {
    const isFilledArr = checkLengthValuesMatrix(matrix);

    if (isFilledArr) {
      const arrEvents: CustomEvents[] = ['Down', 'Left', 'Right', 'Up'];
      let stopGame = true;

      arrEvents.forEach((key) => {
        const { matrix: m } = moveMatrix(key);
        if (!checkLengthValuesMatrix(m)) {
          stopGame = false;
        }
      });

      if (stopGame) {
        rootState.finish();
        return;
      }
    }
    const { score, matrix: m } = moveMatrix(event);
    rootState.addScore(score);
    setMatrix(m);
    setMatrix(addTeal(m, 1));
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      matrixEventRunner(eventData.dir);
    },
  });

  const handleArrowClick = useCallback(
    (e: KeyboardEvent): void => {
      const event = ArrowEventsMap[e.key];
      if (!event) return;
      matrixEventRunner(event);
    },
    [matrix, addTeal],
  );

  const startGame = useCallback((): void => {
    setStartM(Array.from({ length: rows }, (_, y) => createRowCells(cols, y)));
  }, [cols, rows]);

  const restartGame = (): void => {
    startGame();
    rootState.restart();
  };

  const handleRestartClick = (): void => {
    restartGame();
  };

  useEffect(() => {
    if (rootState.status === Game.PLAY) {
      restartGame();
    }
  }, [rootState.status]);

  useEffect(() => {
    setCellsArr(createNullArr(cellsCount));
  }, [cellsCount]);

  useEffect(() => {
    setCellsCount(rows * cols);
    startGame();
  }, [rows, cols, startGame]);

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
    if (boardRef.current) {
      boardRef.current.addEventListener('pointer', () => {
        console.log('e');
      });
    }
    return () => {
      window.removeEventListener('keydown', handleArrowClick);
    };
  }, [handleArrowClick]);

  return (
    <div className={styles.board} {...handlers}>
      {rootState.status === Game.FINISH && (
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h2>Game over</h2>
            <div className={styles.info}>
              <h3 className={styles.score}>Score: {rootState.oldScore}</h3>
              <button
                type="button"
                onClick={handleRestartClick}
                className={styles.restart}
              >
                restart <FontAwesomeIcon icon={faRotate} />
              </button>
            </div>
          </div>
        </div>
      )}
      {cellsArr.map((_, x) => (
        // eslint-disable-next-line react/no-array-index-key
        <CellEmpty key={x} />
      ))}

      {flatSortedMatrix(matrix).map((cell) => {
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
