import { useContext, cloneElement } from "react";

import styles from "./AccordionSummary.module.scss";
import {
  AccordionContext,
  AccordionContextDispatch,
} from "../../contexts/AccordionContext";

export function AccordionSummary({ expandIcon, minimal, children }) {
  const expanded = useContext(AccordionContext);
  const dispatch = useContext(AccordionContextDispatch);

  function handleToggle() {
    dispatch((state) => !state);
  }

  return (
    <button
      onClick={handleToggle}
      className={`${styles.container} ${minimal ? styles.minimal : ""}`}
    >
      {children}
      {cloneElement(expandIcon, {
        className: `${expandIcon.props.className} ${
          expanded ? styles.expand : ""
        }`,
      })}
    </button>
  );
}
