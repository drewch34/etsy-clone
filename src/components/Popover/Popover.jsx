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
    <div className={`${styles.popoverContainer} ${className}`}>
      <button onClick={handlePopoverButtonClick}>
        {buttonIcon ? buttonIcon : null}
        {buttonLabel}
      </button>
      <p tabindex={0} className={styles.popover}>
        {heading ? (
          <>
            <span className={styles.heading}>{heading}</span>
            <br />
          </>
        ) : null}
        {children}
      </p>
    </div>
  );
}
