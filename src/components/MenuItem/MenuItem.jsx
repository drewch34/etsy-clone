import { useContext } from "react";

import styles from "./MenuItem.module.scss";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import { MenuNavigationContext } from "../../contexts/MenuNavigationContext";

function getId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function MenuItem({ title, url, children }) {
  const parentId = useContext(MenuItemContext);
  const { stack, onOpenSubmenu } = useContext(MenuNavigationContext);

  const id = getId(title);

  if (stack.slice(-1).includes(parentId) || stack.includes(id))
    return (
      <li id={id} className={styles.menuItem}>
        {stack.includes(id) ? (
          <MenuItemContext.Provider value={id}>
            {children}
          </MenuItemContext.Provider>
        ) : (
          <button onClick={() => onOpenSubmenu({ id, title, url })}>
            {title}
            <span aria-hidden="true" className="icon sm next"></span>
          </button>
        )}
      </li>
    );
  return null;
}
