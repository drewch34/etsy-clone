import { useState } from "react";
import _ from "lodash";

import { makeServer } from "./mockServer";
import styles from "./styles/Home.module.scss";
import logo from "./assets/logo.svg";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CategoryNavigation } from "./components/CategoryNavigation/CategoryNavigation";
import { ShoppingCartButton } from "./components/ShoppingCartButton/ShoppingCartButton";
import { ProductPhotoGallery } from "./components/ProductPhotoGallery/ProductPhotoGallery";
import { ProductInformation } from "./components/ProductInformation/ProductInformation";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function App() {
  const [totalItems, setTotalItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart({ product, addQuantity = 1 }) {
    // check for equality in id, variation and personalization
    const cartItem = _.find(cartItems, product);

    if (!cartItem) {
      setCartItems([...cartItems, { ...product, quantity: addQuantity }]);
      setTotalItems(totalItems + 1);
    } else {
      setCartItems(
        cartItems.map(({ quantity, ...item }) => {
          if (_.isEqual(item, product)) {
            return { ...item, quantity: quantity + addQuantity };
          }
          return item;
        })
      );
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <a href="/#" tabIndex={0} className={styles.logo}>
            <img src={logo} alt="Logo" />
          </a>

          <nav aria-label="Main navigation" className={styles.mainNavigation}>
            <ul className={styles.links}>
              <li>
                <a href="/#" className={styles.signInLink}>
                  Sign in
                </a>
              </li>
              <li>
                <ShoppingCartButton totalItems={totalItems} />
              </li>
            </ul>
          </nav>

          <CategoryNavigation className={styles.categoryNavigation} />

          <SearchBar className={styles.searchBar} />
        </div>
      </header>

      <ProductPhotoGallery className={styles.photo} />

      <ProductInformation
        onAddToCart={handleAddToCart}
        className={styles.right}
      />
    </div>
  );
}

export default App;
