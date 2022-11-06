import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import useRootStore from 'src/store';
import styles from './ControlPanel.module.scss';

// interface ControlPanelProps {
//   score?: number;
// }

const ControlPanel: FC = () => {
  const { rootState } = useRootStore();
  const { score, maxScore, rows, cols } = rootState;

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    rootState.setRows(Number(e.target.value));
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    rootState.setCols(Number(e.target.value));
  };

  return (
    <div className={styles.controlPanel}>
      <div className={styles.score}>
        <div>Score : {score}</div>
        <div>Max Score: {maxScore}</div>
      </div>
      <div>
        <div>
          cols{' '}
          <input
            value={cols}
            onChange={handleColsChange}
            type="number"
            step={1}
          />
        </div>
        <div>
          rows{' '}
          <input
            value={rows}
            onChange={handleRowsChange}
            type="number"
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(ControlPanel);
