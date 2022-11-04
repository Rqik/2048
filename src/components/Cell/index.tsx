import { clsx } from 'clsx';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { CellProps } from '../Board/types';
import styles from './Cell.module.scss';

const duration = 400; // ms
const delay = 200; // ms

const Cell: FC<CellProps> = memo(({ value, x, y, id, status }) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [oldValue, setOldValue] = useState(value);

  useEffect(() => {
    if (cellRef.current) {
      cellRef.current.style.setProperty('--y', y.toString());
      cellRef.current.style.setProperty('--delay', `${delay}ms`);
      cellRef.current.style.setProperty('--duration', `${duration}ms`);
      cellRef.current.style.setProperty('--x', x.toString());
    }
  }, [x, y, status]);
  // console.log(status);

  useEffect(() => {
    // console.log(
    //   uniqId,
    //   'oldValue = ',
    //   oldValue,
    //   'value = ',
    //   value,
    //   'x = ',
    //   x,
    //   y,
    // );

    cellRef.current?.classList.remove(styles.cellBouncing);
    cellRef.current?.classList.add(styles.cellBouncing);
    setTimeout(() => {
      setTimeout(() => {
        cellRef.current?.classList.remove(styles.cellBouncing);
      }, duration * 2);
      setOldValue(value);
    }, duration);
  }, [value]);

  return (
    <div className={clsx(styles.cell, value && styles.cellUp)} ref={cellRef}>
      {oldValue}
    </div>
  );
});

export type { CellProps };
export default Cell;
