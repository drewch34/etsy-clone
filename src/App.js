import { makeServer } from "./mockServer";
import styles from "./styles/Home.module.scss";
import logo from "./assets/logo.svg";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CategoryNavigation } from "./components/CategoryNavigation/CategoryNavigation";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function App() {
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
              <a
                href="/#"
                aria-label="Shopping cart"
                className={styles.cartLink}
              >
                <span aria-hidden="true" className="icon lg cart"></span>
              </a>
            </li>
          </ul>
        </nav>

        <CategoryNavigation className={styles.categoryNavigation} />

        <SearchBar className={styles.searchBar} />
      </header>
    </div>
  );
}

export default App;
