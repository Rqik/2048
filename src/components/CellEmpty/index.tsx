import { FC, PropsWithChildren } from 'react';
import styles from './CellEmpty.module.scss';

const CellEmpty: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.empty}>{children}</div>
);

export default CellEmpty;
