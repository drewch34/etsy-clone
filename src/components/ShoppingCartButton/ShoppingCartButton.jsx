import styles from "./ShoppingCartButton.module.scss";

export function ShoppingCartButton({ totalItems }) {
  const cartLabel = `Shopping cart${
    totalItems === 1
      ? ` with ${totalItems} item`
      : totalItems > 1
      ? ` with ${totalItems} items`
      : ""
  }`;

  const cartBadgeValue = totalItems < 100 ? totalItems.toString() : "99+";

  return (
    <a
      href="/#"
      aria-label={`Shopping cart with ${cartLabel}`}
      className={styles.cartLink}
    >
      <span aria-hidden="true" className="icon lg cart"></span>
      {totalItems > 0 ? (
        <span aria-hidden="true" className={styles.badge}>
          {cartBadgeValue}
        </span>
      ) : null}
    </a>
  );
}
