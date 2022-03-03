import { cloneElement, useState } from "react";

import styles from "./Modal.module.scss";

export function Modal({ openButton, closeButton, className, children }) {
  const [open, setOpen] = useState(false);

  function handleToggleModal() {
    setOpen((state) => !state);
  }

  return (
    <>
      {cloneElement(openButton, { onClick: handleToggleModal })}

      <div
        onClick={handleToggleModal}
        aria-hidden="true"
        className={`${styles.overlay} ${open ? styles.open : ""}`}
      ></div>
      <div className={`${styles.container} ${open ? styles.open : ""}`}>
        <div className={`stack ${styles.modal}`}>
          {cloneElement(closeButton, {
            onClick: handleToggleModal,
            className: styles.closeButton,
          })}
          {children}
        </div>
      </div>
    </>
  );
}
