import { useState } from "react";

import styles from "./NavigationDrawer.module.scss";
import logo from "../../assets/logo.svg";
import { MenuNavigationContext } from "../../contexts/MenuNavigationContext";
import { MenuItem } from "../MenuItem/MenuItem";

export function NavigationDrawer({ onCloseMenu }) {
  const [navigation, setNavigation] = useState({
    current: { id: "home", title: "Browse Categories" },
    history: [],
    stack: ["home"],
  });

  function handleAdvanceNavigation(menuItem) {
    const nextSubmenu = {
      id: menuItem.id,
      title: menuItem.title,
      url: menuItem.url,
    };

    if (navigation.stack.includes(nextSubmenu.id)) return;

    setNavigation((state) => ({
      ...state,
      current: nextSubmenu,
      history: [...state.history, state.current],
      stack: [...state.stack, nextSubmenu.id],
    }));
  }

  function handleReturnNavigation() {
    if (navigation.history.length === 0) return;
    setNavigation((state) => ({
      ...state,
      current: state.history[state.history.length - 1],
      history: state.history.slice(0, -1),
      stack: state.stack.slice(0, -1),
    }));
  }

  return (
    <section className={styles.navigationDrawer}>
      <header>
        <a href="/#" tabIndex={0} className={styles.logo}>
          <img src={logo} alt="Logo" />
        </a>

        <button
          onClick={onCloseMenu}
          aria-label="Close category navigation"
          className={styles.closeMenuButton}
        >
          <span aria-hidden="true" className="icon lg close"></span>
        </button>

        <button
          onClick={handleReturnNavigation}
          aria-label="Return to previous menu"
          className={`${styles.returnMenuButton} ${
            navigation.history.length > 0 ? styles.visible : ""
          }`}
        >
          <span aria-hidden="true" className="icon lg back"></span>
        </button>

        <span id="navigation-header" className={styles.title}>
          {navigation.current.title}
        </span>
        {navigation.current.url ? (
          <a href="/#" className={styles.subtitle}>
            View all
          </a>
        ) : null}
      </header>

      <MenuNavigationContext.Provider
        value={{
          stack: navigation.stack,
          onOpenSubmenu: handleAdvanceNavigation,
        }}
      >
        <ul aria-labelledby="navigation-header" className={styles.categoryList}>
          <MenuItem title={"Jewelry & Accessories"} url="/#">
            <ul>
              <MenuItem title={"Accessories"} url="/#">
                <a href="/#" id="hats-caps">
                  {"Hats & Caps"}
                </a>
                <ul aria-labelledby="hats-caps">
                  <li>
                    <a href="/#">{"Baseball & Trucker Hats"}</a>
                  </li>
                  <li>
                    <a href="/#">{"Beanies & Winter Hats"}</a>
                  </li>
                  <li>
                    <a href="/#">{"Sun Hats"}</a>
                  </li>
                </ul>

                <a href="/#" id="hair-accessories">
                  {"Hair Accessories"}
                </a>
                <ul aria-labelledby="hair-accessories">
                  <li>
                    <a href="/#">{"Fascinators & Mini Hats"}</a>
                  </li>
                  <li>
                    <a href="/#">{"Barrettes & Clips"}</a>
                  </li>
                  <li>
                    <a href="/#">{"Ties & Elastics"}</a>
                  </li>
                  <li>
                    <a href="/#">{"Wreaths & Tiaras"}</a>
                  </li>
                </ul>

                <a href="/#">{"Sunglasses & Eyewear"}</a>
                <a href="/#">{"Scarves & Wraps"}</a>
                <a href="/#">{"Belts & Suspenders"}</a>
                <a href="/#">{"Keychains & Lanyards"}</a>
                <a href="/#">{"Cosmetic & Toiletry Bags"}</a>
                <a href="/#">{"Gloves & Mittens"}</a>
                <a href="/#">{"Umbrellas & Rain Accessories"}</a>
                <a href="/#">{"Wallets & Money Clips"}</a>
              </MenuItem>
              <MenuItem title={"Bags & Purses"} />
              <MenuItem title={"Necklaces"} />
              <MenuItem title={"Rings"} />
              <MenuItem title={"Earrings"} />
              <MenuItem title={"Bracelets"} />
              <MenuItem title={"Body Jewelry"} />
            </ul>
          </MenuItem>
          <MenuItem title={"Clothing & Shoes"} />
          <MenuItem title={"Home & Living"} />
          <MenuItem title={"Wedding & Party"} />
          <MenuItem title={"Toys & Entertainment"} />
          <MenuItem title={"Art & Collectibles"} />
          <MenuItem title={"Craft Supplies & Tools"} />
        </ul>
      </MenuNavigationContext.Provider>
    </section>
  );
}
