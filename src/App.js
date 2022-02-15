import { useState } from "react";

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
  const [totalItems, setTotalItems] = useState(3);

  return (
    <div>
      <header className={styles.header}>
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
      </header>

<<<<<<< HEAD
      <ProductPhotoGallery className={styles.ProductPhotoGallery} />

      <ProductInformation />
=======
      <ProductPhotoGallery className={styles.photo} />


>>>>>>> 8c621d4d2a83dc211d25e883b9f148f5b5a9108f
    </div>
  );
}

export default App;
