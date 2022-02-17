import styles from "./SelectField.module.scss";

export function SelectField({ label, value, onChange, name, id, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select id={id} name={name} value={value} onChange={onChange}>
          <option value="">Select an option</option>
          {children}
        </select>
      </div>
    </div>
  );
}
