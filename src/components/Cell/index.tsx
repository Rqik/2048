import { clsx } from 'clsx';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { CellProps } from '../Board/types';
import styles from './Cell.module.scss';

const duration = 270; // ms
const delay = 180; // ms

const Cell: FC<CellProps & { connectCell?: CellProps }> = memo(
  ({ value, x, y, status, connectCell }) => {
    const cellRef = useRef<HTMLDivElement>(null);
    const [oldValue, setOldValue] = useState(value);
    const [anim, setAnim] = useState(false);

    useEffect(() => {
      if (cellRef.current) {
        cellRef.current.style.setProperty('--delay', `${delay}ms`);
        cellRef.current.style.setProperty('--duration', `${duration}ms`);
      }
    }, []);

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
          setOldValue(value);
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
          anim && styles.cellBouncing,
          status === 'create' && styles.cellCreated,
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
