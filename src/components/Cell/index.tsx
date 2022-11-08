import { clsx } from 'clsx';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { ListFormat } from 'typescript';
import { CellProps } from '../Board/types';
import styles from './Cell.module.scss';

const duration = 180; // ms
const delay = 180; // ms

const fillMap = (val: number): string => styles[`cell${val}`];

const Cell: FC<CellProps & { connectCell?: CellProps }> = memo(
  ({ value, x, y, status, connectCell, id }) => {
    const cellRef = useRef<HTMLDivElement>(null);
    const [oldValue, setOldValue] = useState(value);
    const [anim, setAnim] = useState(false);
    if (value === null) {
      console.log(value, id, x, y, status);
    }

    useEffect(() => {
      if (cellRef.current && (status !== 'create' || status === null)) {
        cellRef.current.style.setProperty('--delay', `${delay}ms`);
        cellRef.current.style.setProperty('--duration', `${duration}ms`);
      } else if (cellRef.current) {
        cellRef.current.style.setProperty('--delay', `${0}ms`);
        cellRef.current.style.setProperty('--duration', `${0}ms`);
      }
    }, [status]);

    useEffect(() => {
      if (!cellRef.current) return;
      if (connectCell) {
        cellRef.current.style.setProperty('--y', connectCell.y.toString());
        cellRef.current.style.setProperty('--x', connectCell.x.toString());
        cellRef.current.style.setProperty('--z-index', '2');
      } else {
        cellRef.current.style.setProperty('--y', y.toString());
        cellRef.current.style.setProperty('--x', x.toString());
        cellRef.current.style.setProperty('--z-index', '1');
        setTimeout(() => {
          cellRef?.current?.style.setProperty('--z-index', '3');
        }, duration);
      }
    }, [x, y, connectCell]);

    useEffect(() => {
      let tId: NodeJS.Timeout;

      if (typeof status === 'string') {
        setAnim(true);
        setTimeout(() => {
          setOldValue(() => value);
        }, duration);
      }

      return () => {
        if (tId) clearTimeout(tId);
      };
    }, [value, status]);

    return (
      <div
        className={clsx(
          styles.cell,
          value && styles.cellUp,
          !oldValue && styles.cellHide,
          anim && styles.cellBouncing,
          status === 'create' && styles.cellCreated,
          oldValue && fillMap(oldValue),
        )}
        onAnimationEnd={() => {
          if (anim) {
            setAnim(false);
          }
        }}
        ref={cellRef}
      >
        {oldValue}
      </div>
    );
  },
);

export type { CellProps };
export default Cell;
