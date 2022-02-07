import { useState } from "react";

import styles from "./CategoryNavigation.module.scss";
import { NavigationDrawer } from "../NavigationDrawer/NavigationDrawer";
import { SubNavigationItem } from "../SubNavigationItem/SubNavigationItem";

const menus = [
  {
    title: "Jewelry & Accessories",
    subNavigation: [
      {
        title: "Accessories",
        url: "/#",
        subNavigation: [
          {
            title: "Hats & Caps",
            url: "/#",
            subNavigation: [
              { title: "Baseball & Trucker Hats", url: "" },
              { title: "Beanies & Winter Hats", url: "" },
              { title: "Sun Hats", url: "" },
            ],
          },
          {
            title: "Hair Accessories",
            url: "/#",
            subNavigation: [
              { title: "Headbands", url: "" },
              { title: "Fascinators & Mini Hats", url: "" },
              { title: "Barrettes & Clips", url: "" },
              { title: "Ties & Elastics", url: "" },
              { title: "Wreaths & Tiaras", url: "" },
            ],
          },
          { title: "Sunglasses & Eyewear", url: "/#", subNavigation: [] },
          { title: "Scarves & Wraps", url: "/#", subNavigation: [] },
          { title: "Belts & Suspenders", url: "/#", subNavigation: [] },
          { title: "Keychains & Lanyards", url: "/#", subNavigation: [] },
          { title: "Cosmetic & Toiletry Bags", url: "/#", subNavigation: [] },
          { title: "Gloves & Mittens", url: "/#", subNavigation: [] },
          {
            title: "Umbrellas & Rain Accessories",
            url: "/#",
            subNavigation: [],
          },
          { title: "Wallets & Money Clips", url: "/#", subNavigation: [] },
        ],
      },
      { title: "Bags & Purses", url: "/#", subNavigation: [] },
      { title: "Necklaces", url: "/#", subNavigation: [] },
      { title: "Rings", url: "/#", subNavigation: [] },
      { title: "Earrings", url: "/#", subNavigation: [] },
      { title: "Bracelets", url: "/#", subNavigation: [] },
      { title: "Body Jewelry", url: "/#", subNavigation: [] },
    ],
  },
  { title: "Clothing & Shoes", subNavigation: [] },
  { title: "Home & Living", subNavigation: [] },
  { title: "Wedding & Party", subNavigation: [] },
  { title: "Toys & Entertainment", subNavigation: [] },
  { title: "Art & Collectibles", subNavigation: [] },
  { title: "Craft Supplies & Tools", subNavigation: [] },
];

export function CategoryNavigation({ className }) {
  const [menuOpened, setMenuOpened] = useState(false);

  function handleOpenMenu() {
    setMenuOpened(true);
  }

  function handleCloseMenu() {
    setMenuOpened(false);
  }

  return (
    <nav
      aria-label="Category navigation"
      className={`${styles.categoryNavigation} ${className}`}
    >
      <button
        onClick={handleOpenMenu}
        aria-label="Expand mobile category navigation"
        className={styles.menuButton}
      >
        <span aria-hidden="true" className="icon md menu"></span>
      </button>

      {/* Navigation Drawer */}
      {menuOpened ? <NavigationDrawer onCloseMenu={handleCloseMenu} /> : null}

      {/* Top bar navigation -> Subnavigation */}
      <div className={styles.topBarNavigation}>
        <ul className={styles.categoryList}>
          <li>
            <a href="/#" id="category-id">
              {"Jewelry & Accessories"}
            </a>
            <div className={styles.tabbed}>
              <ul className={styles.tabList}>
                <SubNavigationItem label={"Accessories"} icon={"sm next"}>
                  <ul className={styles.tabPanel}>
                    <li>
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
                    </li>
                    <li>
                      <a href="/#" id="hair-accessories">
                        {"Hair Accessories"}
                      </a>
                      <ul aria-labelledby="hats-caps">
                        <li>
                          <a href="/#">{"Headbands"}</a>
                        </li>
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
                    </li>

                    <li>
                      <a href="/#">{"Sunglasses & Eyewear"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Scarves & Wraps"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Belts & Suspenders"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Keychains & Lanyards"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Cosmetic & Toiletry Bags"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Gloves & Mittens"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Umbrellas & Rain Accessories"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Wallets & Money Clips"}</a>
                    </li>
                  </ul>
                </SubNavigationItem>
                <SubNavigationItem label={"Bags & Purses"} icon={"sm next"}>
                  <ul className={styles.tabPanel}>
                    <li>
                      <a href="/#">{"Backpacks"}</a>
                    </li>
                    <li>
                      <a href="/#" id="handbags">
                        {"Handbags"}
                      </a>
                      <ul aria-labelledby="handbags">
                        <li>
                          <a href="/#">{"Clutches & Evening Bags"}</a>
                        </li>
                        <li>
                          <a href="/#">{"Shoulder Bags"}</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/#">{"Diaper Bags"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Luggage & Duffel Bags"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Phone Cases"}</a>
                    </li>
                    <li>
                      <a href="/#">{"Totes"}</a>
                    </li>
                  </ul>
                </SubNavigationItem>
                <SubNavigationItem label={"Necklaces"} icon={"sm next"} />
                <SubNavigationItem label={"Rings"} icon={"sm next"} />
                <SubNavigationItem label={"Earrings"} icon={"sm next"} />
                <SubNavigationItem label={"Bracelets"} icon={"sm next"} />
                <SubNavigationItem label={"Body Jewelry"} icon={"sm next"} />
              </ul>
            </div>
          </li>
          <li>
            <a href="/#" id="category-id">
              {"Clothing & Shoes"}
            </a>
          </li>
          <li>
            <a href="/#">{"Home & Living"}</a>
          </li>
          <li>
            <a href="/#">{"Wedding & Party"}</a>
          </li>
          <li>
            <a href="/#">{"Toys & Entertainment"}</a>
          </li>
          <li>
            <a href="/#">{"Art & Collectibles"}</a>
          </li>
          <li>
            <a href="/#">{"Craft Supplies & Tools"}</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
