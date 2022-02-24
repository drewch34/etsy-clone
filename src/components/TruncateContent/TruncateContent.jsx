import { useEffect, useRef, useState } from "react";
import styles from "./TruncateContent.module.scss";

export function TruncateContent({
  expandLabel = "More information",
  collapseLabel = "Less information",
  children,
}) {
  const [expand, setExpand] = useState(false);
  const [truncate, setTruncate] = useState(false);
  const contentRef = useRef(null);

  function handleToggle() {
    setExpand((state) => !state);
  }

  useEffect(() => {
    if (!contentRef) return;
    if (contentRef.current.scrollHeight > contentRef.current.clientHeight)
      setTruncate(true);
  }, [contentRef]);

  return (
    <div className={styles.container}>
      <div
        ref={contentRef}
        className={`${styles.content} ${expand ? styles.expanded : ""}`}
      >
        {children}
      </div>
      {truncate ? (
        <button onClick={handleToggle} className={styles.button}>
          {expand ? collapseLabel : expandLabel}
        </button>
      ) : null}
    </div>
  );
}
