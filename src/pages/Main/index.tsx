import { FC } from 'react';
import Board from '../../components/Board';

interface MainProps {}

const Main: FC<MainProps> = (props) => (
  <div>
    <Board />
  </div>
);

export default Main;
