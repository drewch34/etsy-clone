import { useContext } from "react";
import { AccordionContext } from "../../contexts/AccordionContext";
import styles from "./AccordionDetails.module.scss";

export function AccordionDetails({ className, children }) {
  const expanded = useContext(AccordionContext);

  return (
    <div
      className={`${className} ${styles.container} ${
        expanded ? styles.expanded : ""
      }`}
    >
      {children}
    </div>
  );
}
