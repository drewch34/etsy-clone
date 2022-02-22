import { useContext, cloneElement } from "react";

import styles from "./AccordionSummary.module.scss";
import {
  AccordionContext,
  AccordionContextDispatch,
} from "../../contexts/AccordionContext";

export function AccordionSummary({ expandIcon, children }) {
  const expanded = useContext(AccordionContext);
  const dispatch = useContext(AccordionContextDispatch);

  function handleToggle() {
    dispatch((state) => !state);
  }

  return (
    <h2 className={styles.container}>
      <button onClick={handleToggle}>
        {children}
        {cloneElement(expandIcon, {
          className: `${expandIcon.props.className} ${
            expanded ? styles.expand : ""
          }`,
        })}
      </button>
    </h2>
  );
}
