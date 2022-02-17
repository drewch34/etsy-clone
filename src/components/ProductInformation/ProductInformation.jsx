import { useState } from "react";
import { formatCurrency, formatInteger, formatPercent } from "../../utils";
import { Popover } from "../Popover/Popover";
import { SelectField } from "../SelectField/SelectField";
import { TextareaField } from "../TextareaField/TextareaField";
import styles from "./ProductInformation.module.scss";

const product = {
  title:
    "Valentines Day Gift for Him,Personalized Wallet,Mens Wallet,Engraved Wallet,Leather Wallet,Custom Wallet,Boyfriend Gift for Men,Gift for Dad",
  rating: 4.5,
  price: {
    sale: 10965,
    original: 27416,
    currency: "USD",
    numberFormat: "en-US",
  },
  stock: 200,
  personalization: {
    required: true,
    maxlength: 268,
  },
  engravingSide: [
    { value: "1058734824", label: "No Engraving (USD 108.70)" },
    { value: "1077037115", label: "Front Side Only (USD 212.02)" },
    { value: "1077037117", label: "Inside Right Only (USD 212.02)" },
    { value: "1319674161", label: "Inside Left Only (USD 212.02)" },
    { value: "1077037119", label: "Front & Inside Right (USD 255.52)" },
    { value: "1094738331", label: "Front & Inside Left (USD 255.52)" },
    { value: "1319674163", label: "Inside Left & Right (USD 255.52)" },
    { value: "1058734828", label: "Front & Left & Right (USD 288.15)" },
  ],
  color: [
    { value: "1413611071", label: "Brown" },
    { value: "1413611075", label: "Black" },
    { value: "1984551064", label: "Tan" },
  ],
};
const seller = { name: "StayFinePersonalized", totalSales: 82878 };

export function ProductInformation({ className }) {
  const [formValues, setFormValues] = useState({});

  function getDiscount(original, sale) {
    return original - sale;
  }

  function getDiscountPercentage(original, sale) {
    return (original - sale) / original;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues);
  }

  function onFormFieldChange({ fieldName, fieldValue }) {
    setFormValues((state) => ({ ...state, [fieldName]: fieldValue }));
  }

  function handleFieldChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    onFormFieldChange({ fieldName, fieldValue });
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

      <section className={styles.priceContainer}>
        <div>
          <p className={styles.price}>
            {formatCurrency(
              product.price.sale,
              product.price.currency,
              product.price.numberFormat
            )}
          </p>
          <p className={`${styles.textGray} ${styles.textStrikethrough}`}>
            {formatCurrency(
              product.price.original,
              product.price.currency,
              product.price.numberFormat
            )}
          </p>
          {product.stock > 0 ? (
            <p className={styles.stock}>
              <span aria-hidden="true" className="icon md check"></span>In stock
            </p>
          ) : null}
        </div>

        <p className={styles.textDiscount}>
          You save{" "}
          {formatCurrency(
            getDiscount(product.price.original, product.price.sale),

            product.price.currency,
            product.price.numberFormat
          )}{" "}
          (
          {formatPercent(
            getDiscountPercentage(product.price.original, product.price.sale),
            product.price.numberFormat
          )}
          )
        </p>
        <p className={styles.textGray}>
          Local taxes included (where applicable)
        </p>
      </section>

      <form onSubmit={handleSubmit} className={styles.productOptions}>
        <SelectField
          value={formValues["engravingSide"]}
          onChange={handleFieldChange}
          name="engravingSide"
          label="Engraving Side?"
          id="engravingSide"
        >
          {product.engravingSide.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          value={formValues["color"]}
          onChange={handleFieldChange}
          name="color"
          label="Color"
          id="color"
        >
          {product.color.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <TextareaField
          value={formValues["personalization"]}
          onChange={handleFieldChange}
          maxLength={product.personalization.maxlength}
          id="personalization"
          name="personalization"
          instructions={
            <p className={styles.textGray}>
              Example only:
              <br />
              <br />
              Front: PAUL
              <br />
              Inside right: I love you to the moon and back Inside left: I love
              you more
              <br />
              <br />
              "no engraving" if you choose "no engraving" option
            </p>
          }
        />

        <div className={styles.addToCart}>
          <button className={styles.buttonFilledPrimary}>Add to cart</button>
          <div>
            <div aria-hidden="true" className="icon xl shoppingCart"></div>
            <p>
              <span className={styles.textBold}>Other people want this.</span>{" "}
              Over 20 people have this in their carts right now.
            </p>
          </div>
          <div>
            <span aria-hidden="true" className="icon xl bestSellerBadge"></span>
            <p>
              <span className={styles.textBold}>Star Seller.</span> This seller
              has a history of 5-star reviews, shipping on time, and replying
              quickly when they got any messages.
            </p>
          </div>
        </div>
      </form>

      {/*


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
