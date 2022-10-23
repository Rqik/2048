import { FC } from 'react';

import Board from '@/components/Board';
import ControlPanel from '@/components/ControlPanel';

import styles from './Main.module.scss';

interface MainProps {}

const Main: FC<MainProps> = (props) => (
  <div className={styles.main}>
    2048
    <ControlPanel />
    <Board />
  </div>
);

export default Main;
