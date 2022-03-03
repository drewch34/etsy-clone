import { useContext, cloneElement, useEffect } from "react";

import styles from "./AccordionSummary.module.scss";
import {
  AccordionContext,
  AccordionContextDispatch,
} from "../../contexts/AccordionContext";

export function AccordionSummary({
  expandIcon,
  minimal,
  collapse = false,
  onClick = () => {},
  children,
  ...rest
}) {
  const expanded = useContext(AccordionContext);
  const dispatch = useContext(AccordionContextDispatch);

  function handleToggle(event) {
    dispatch((state) => !state);
    onClick(event);
  }

  useEffect(() => {
    if (collapse) dispatch(false);
  }, [collapse, dispatch]);

  return (
    <button
      onClick={handleToggle}
      className={`${styles.container} ${minimal ? styles.minimal : ""}`}
      {...rest}
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
