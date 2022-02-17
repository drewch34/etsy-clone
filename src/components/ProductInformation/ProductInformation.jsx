import { useEffect, useRef, useState } from "react";
import { Popover } from "../Popover/Popover";
import { SelectField } from "../SelectField/SelectField";
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
  const [remainingCharacters, setRemainingCharacters] = useState(
    product.personalization.maxlength
  );
  const textareaRef = useRef(null);

  function formatInteger(number) {
    return new Intl.NumberFormat().format(number);
  }

  function formatCurrency(price, currency, numberFormat) {
    return new Intl.NumberFormat(numberFormat, {
      style: "currency",
      currency: currency,
      currencyDisplay: "code",
    }).format(price / 100);
  }

  function formatPercent(value, numberFormat) {
    return new Intl.NumberFormat(numberFormat, { style: "percent" }).format(
      value
    );
  }

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

  function handleTextareaChange(event) {
    const textarea = event.target;
    const fieldName = textarea.name;
    const fieldValue = textarea.value;
    onFormFieldChange({ fieldName, fieldValue });
    setRemainingCharacters(
      product.personalization.maxlength - fieldValue.length
    );
  }

  function onFormFieldChange({ fieldName, fieldValue }) {
    setFormValues((state) => ({ ...state, [fieldName]: fieldValue }));
  }

  function handleFieldChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    onFormFieldChange({ fieldName, fieldValue });
  }

  useEffect(() => {
    if (!formValues.personalization) return;
    // resize area
    const textarea = textareaRef.current;
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
    const paddingTop = parseFloat(getComputedStyle(textarea).paddingTop);
    const paddingBottom = parseFloat(getComputedStyle(textarea).paddingBottom);
    const minRows = 2;
    textarea.style.height = "";
    textarea.rows = minRows;
    const calculatedRows = Math.floor(
      (textarea.scrollHeight - paddingTop - paddingBottom) / lineHeight
    );
    textarea.rows = calculatedRows;
  }, [formValues.personalization]);

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

        <div className={`${styles.textareaField}  ${styles.textSmall}`}>
          <label>Add your personalization</label>
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
          <textarea
            ref={textareaRef}
            id="personalization"
            name="personalization"
            rows={2}
            maxLength={product.personalization.maxlength}
            onChange={handleTextareaChange}
            value={formValues["personalization"]}
          />
          <span className={styles.textAlignRight}>{remainingCharacters}</span>
        </div>

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
