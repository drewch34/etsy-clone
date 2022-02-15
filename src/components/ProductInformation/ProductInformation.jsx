import { Popover } from "../Popover/Popover";
import styles from "./ProductInformation.module.scss";

const product = {
  title:
    "Valentines Day Gift for Him,Personalized Wallet,Mens Wallet,Engraved Wallet,Leather Wallet,Custom Wallet,Boyfriend Gift for Men,Gift for Dad",
  rating: 4.5,
};
const seller = { name: "StayFinePersonalized", totalSales: 82878 };

export function ProductInformation({className}) {
  function formatInteger(number) {
    return new Intl.NumberFormat().format(number);
  }


  return (
    <section className={`${className}`}>
      <section className={styles.storeOverview}>
        <a href="/#">{seller.name}</a>
        <div>
          <Popover
            buttonLabel={"Star Seller"}
            buttonIcon={
              <span aria-hidden="true" className="icon md starBadge"></span>
            }
            heading={"Star Seller"}
            className={styles.popover}
          >
            This seller has a history of 5-star reviews, shipping on time, and
            replying quickly when they got any messages.
          </Popover>
          <span aria-hidden="true" className={styles.verticalSeparator}></span>
          <span>
            {seller.totalSales === 1
              ? "1 sale"
              : `${formatInteger(seller.totalSales)} sales`}
          </span>
          <span aria-hidden="true" className={styles.verticalSeparator}></span>
          <a href="#reviews" className={styles.rating}>
            {Array.from(Array(Math.ceil(product.rating)).keys()).map(
              (_, index) => (
                <span key={index} className="icon sm star"></span>
              )
            )}
          </a>
        </div>
      </section>

      <section className={styles.productTitleContainer}>
        <h1 className={styles.title}>{product.title}</h1>
        <Popover buttonLabel={"Etsy's Pick"} className={styles.popover}>
          Selected by Etsy's style and trend editors.
        </Popover>
      </section>
      {/*
      <div>
        <p>USD 20.00+</p>
        <p>from USD 50.00+</p>
        <p>stock availability</p>
        <p>You save USD 20.00 (10%)</p>
        <p>Taxes info</p>
      </div>

      <div className={styles.customizationOptions}>
        <p className={styles.field}>
          <label>Engraving Side?</label>
          <input type="text" />
        </p>

        <p className={styles.field}>
          <label>Engraving Side?</label>
          <input type="text" />
        </p>

        <p className={styles.field}>
          <label>Engraving Side?</label>
          <p>Personalization instructions</p>
          <input type="text" />
        </p>
      </div>

      <div className={styles.callToAction}>
        <button>Add to cart</button>
        <p>Other people want this</p>
        <p>Star seller</p>
      </div>

      <div className={styles.accordion}>
        <h2>Highlights</h2>
        <p>content</p>
        <h2>Description</h2>
        <h2>Shipping and return policies</h2>
        <h2>FAQs</h2>
        <h2>Meet your seller</h2>
      </div> */}
    </section>
  );
}
