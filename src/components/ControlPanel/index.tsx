import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import useRootStore from 'src/store';
import styles from './ControlPanel.module.scss';

// interface ControlPanelProps {
//   score?: number;
// }

const ControlPanel: FC = () => {
  const {
    rootState: { score },
  } = useRootStore();
  return (
    <div className={styles.controlPanel}>
      <div>Score : {score}</div>
      <div>Max Score</div>
    </div>
  );
};

export default observer(ControlPanel);
