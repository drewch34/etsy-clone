import { useEffect, useRef, useState } from "react";
import styles from "./TextareaField.module.scss";

export function TextareaField({
  value,
  onChange,
  errors = [],
  maxLength,
  instructions,
  id,
  name,
}) {
  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);
  const textareaRef = useRef(null);
  const hasErrors = errors.length > 0;
  const minRows = 1;

  useEffect(() => {
    if (!value) return;
    setRemainingCharacters(maxLength - value.length);
  }, [maxLength, value]);

  useEffect(() => {
    if (!value) return;
    const textarea = textareaRef.current;
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
    const paddingTop = parseFloat(getComputedStyle(textarea).paddingTop);
    const paddingBottom = parseFloat(getComputedStyle(textarea).paddingBottom);
    textarea.style.height = "";
    textarea.rows = minRows;
    const calculatedRows = Math.floor(
      (textarea.scrollHeight - paddingTop - paddingBottom) / lineHeight
    );
    textarea.rows = calculatedRows;
  }, [value]);

  return (
    <div
      className={`${styles.textareaField}  ${styles.textSmall}  ${
        hasErrors ? styles.error : ""
      }`}
    >
      <label htmlFor={id}>Add your personalization</label>
      <p className={styles.instructions}>{instructions}</p>
      <textarea
        ref={textareaRef}
        maxLength={maxLength}
        onChange={onChange}
        value={value}
        name={name}
        rows={minRows}
        id={id}
      />
      <span className={styles.textAlignRight}>{remainingCharacters}</span>

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
