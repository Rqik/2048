import { ChangeEventHandler, FC } from 'react';

import styles from './Field.module.scss';

type FieldProps = {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  label?: string | null;
};

const Field: FC<FieldProps> = ({
  value,
  onChange,
  type = 'number',
  label = null,
}) => (
  <label className={styles.field}>
    {label !== null && <span className={styles.label}>{label}</span>}
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
    />
  </label>
);

export default Field;
