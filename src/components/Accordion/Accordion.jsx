import { useState } from "react";
import {
  AccordionContext,
  AccordionContextDispatch,
} from "../../contexts/AccordionContext";

export function Accordion({ startExpanded = false, children }) {
  const [expanded, setExpanded] = useState(startExpanded);

  return (
    <section>
      <AccordionContext.Provider value={expanded}>
        <AccordionContextDispatch.Provider value={setExpanded}>
          {children}
        </AccordionContextDispatch.Provider>
      </AccordionContext.Provider>
    </section>
  );
}
