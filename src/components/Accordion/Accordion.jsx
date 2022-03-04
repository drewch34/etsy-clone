import { useState, useContext } from "react";
import {
  AccordionContext,
  AccordionContextDispatch,
} from "../../contexts/AccordionContext";

export function Accordion({ startExpanded = false, children }) {
  const [expanded, setExpanded] = useState(startExpanded);
  const expandedContext = useContext(AccordionContext);
  const isNestedAccordion = expandedContext !== null;
  const parentExpanded = expandedContext === false;

  return (
    <section>
      <AccordionContext.Provider
        value={isNestedAccordion && parentExpanded ? false : expanded}
      >
        <AccordionContextDispatch.Provider value={setExpanded}>
          {children}
        </AccordionContextDispatch.Provider>
      </AccordionContext.Provider>
    </section>
  );
}
