import { FC } from 'react';
import styles from './Board.module.scss';

interface BoardProps {}

const Board: FC<BoardProps> = (props) => (
  <div className={styles.board}>Board</div>
);

export default Board;
