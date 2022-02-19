import styles from "./SelectField.module.scss";

export function SelectField({
  label,
  value,
  onChange,
  errors = [],
  name,
  id,
  children,
}) {
  const hasErrors = errors.length > 0;

  return (
    <div className={`${styles.field} ${hasErrors ? styles.error : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select id={id} name={name} value={value} onChange={onChange}>
          {children}
        </select>
      </div>
      {hasErrors ? (
        <ul className={styles.errorMessage}>
          {errors.map((error, index) => (
            <li key={index}>{`${error}. `}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
