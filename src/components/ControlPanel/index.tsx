import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import useRootStore from 'src/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import Field from '../Field';
import styles from './ControlPanel.module.scss';

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
      <div className={styles.matrix}>
        <Field value={cols} onChange={handleColsChange} label="cols" />
        <Field value={rows} onChange={handleRowsChange} label="rows" />
        <FontAwesomeIcon icon={faRotate} />
      </div>
    </div>
  );
};

export default observer(ControlPanel);
