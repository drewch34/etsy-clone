import { useRef, useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

import styles from "./SearchBar.module.scss";

export function SearchBar({ className }) {
  const [searchValue, setSearchValue] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const searchInputRef = useRef();

  async function fetchRelatedProducts(searchValue, callbackFn) {
    const { data: relatedProducts } = await axios.get("api/related-products/", {
      params: {
        searchValue,
      },
    });
    callbackFn(relatedProducts);
  }

  const debouncedFetchRelatedProducts = useCallback(
    debounce(fetchRelatedProducts, 250),
    []
  );

  function handleSearchValueChange(event) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    axios
      .get("api/popular-searches/")
      .then(({ data: popularSearches }) => setPopularSearches(popularSearches));
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setRelatedProducts([]);
      return;
    }
    debouncedFetchRelatedProducts(searchValue, (res) => {
      setRelatedProducts(res);
    });
  }, [searchValue, debouncedFetchRelatedProducts]);

  return (
    <form
      onReset={() => {
        setSearchValue("");
        searchInputRef.current.focus();
      }}
      role="search"
      aria-label="Sitewide"
      className={`${styles.searchBar} ${className}`}
    >
      {/* Searchbox */}
      <input
        ref={searchInputRef}
        value={searchValue}
        onChange={handleSearchValueChange}
        type="search"
        placeholder=" "
        id="search-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      ></input>
      <label htmlFor="searchbox">Search for anything</label>

      <div className={styles.buttonGroup}>
        <button
          type="reset"
          aria-label="Clear searchbox"
          className={styles.clearSearchButton}
        >
          <span aria-hidden="true" className="icon sm close"></span>
        </button>

        <button
          onClick={(event) => {
            event.preventDefault();
          }}
          aria-label="Search"
          className={styles.searchButton}
        >
          <span aria-hidden="true" className="icon md search"></span>
        </button>
      </div>

      {/* List Autocomplete with Manual Selection */}
      <section className={styles.searchSuggestions}>
        <span className={styles.title}>Popular right now</span>

        <ul aria-label="Search suggestions">
          {(searchValue ? relatedProducts : popularSearches).map(
            (suggestion) => (
              <li key={suggestion.id}>
                <a href="/#">{suggestion.title.toLowerCase()}</a>
              </li>
            )
          )}
        </ul>

        <a href="/#" className={styles.searchShop}>
          find shop names containing "{searchValue}"
        </a>
      </section>
    </form>
  );
}
