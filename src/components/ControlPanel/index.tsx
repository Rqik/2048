import { FC } from 'react';
import styles from './ControlPanel.module.scss';

interface ControlPanelProps {
  score?: number;
}

const ControlPanel: FC<ControlPanelProps> = ({ score = 0 }) => (
  <div className={styles.controlPanel}>
    <div>Score : {score}</div>
    <div>Max Score</div>
  </div>
);

export default ControlPanel;
