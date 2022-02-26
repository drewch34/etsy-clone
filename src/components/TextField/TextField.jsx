import styles from "./TextField.module.scss";

export function TextField({
  value,
  onChange,
  errors = [],
  id,
  name,
  label,
  ...rest
}) {
  const hasErrors = errors.length > 0;

  return (
    <div
      className={`${styles.textField}  ${styles.textSmall}  ${
        hasErrors ? styles.error : ""
      } stackSmall`}
    >
      <label htmlFor={id}>{label}</label>

      <input
        value={value}
        onChange={onChange}
        type="text"
        id={id}
        name={name}
        {...rest}
      />

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
