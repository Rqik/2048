import { FC, memo, useEffect, useRef } from 'react';
import styles from './Cell.module.scss';

interface CellProps {
  value: number | null;
  x: number;
  y: number;
}

const Cell: FC<CellProps> = memo(({ value, x, y }) => {
  const ceilRef = useRef<HTMLDivElement>(null);
  console.log();

  useEffect(() => {
    if (ceilRef.current) {
      ceilRef.current.style.setProperty('--y', y.toString());
      ceilRef.current.style.setProperty('--x', x.toString());
    }
  }, [x, y]);

  return (
    <div className={styles.cell} ref={ceilRef}>
      {value}
    </div>
  );
});

export default Cell;
