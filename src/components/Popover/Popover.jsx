import styles from "./Popover.module.scss";

export function Popover({
  buttonLabel,
  buttonIcon,
  heading,
  children,
  className,
}) {
  function handlePopoverButtonClick(e) {
    const popoverEl = e.target.nextSibling;
    popoverEl.focus();
  }

  return (
    <span className={`${styles.popoverContainer} ${className}`}>
      <button onClick={handlePopoverButtonClick} type="button">
        {buttonIcon ? buttonIcon : null}
        {buttonLabel}
      </button>
      <span tabIndex={0} className={styles.popover}>
        {heading ? (
          <>
            <span className={styles.heading}>{heading}</span>
            <br />
          </>
        ) : null}
        {children}
      </span>
    </span>
  );
}
