import styles from "./ProductInformation.module.scss";
import { formatCurrency, formatInteger, formatPercent } from "../../utils";
import { Popover } from "../Popover/Popover";
import { SelectField } from "../SelectField/SelectField";
import { TextareaField } from "../TextareaField/TextareaField";
import { useForm } from "../../hooks/useForm";

const product = {
  id: "3A667282692",
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
  fields: [
    {
      id: "variation01",
      name: "variation01",
      label: "Engraving?",
      type: "select",
      options: [
        { value: "1058734824", label: "No Engraving (USD 108.70)" },
        { value: "1077037115", label: "Front Side Only (USD 212.02)" },
        { value: "1077037117", label: "Inside Right Only (USD 212.02)" },
        { value: "1319674161", label: "Inside Left Only (USD 212.02)" },
        { value: "1077037119", label: "Front & Inside Right (USD 255.52)" },
        { value: "1094738331", label: "Front & Inside Left (USD 255.52)" },
        { value: "1319674163", label: "Inside Left & Right (USD 255.52)" },
        { value: "1058734828", label: "Front & Left & Right (USD 288.15)" },
      ],
      validation: {
        schema: "string",
        methods: [
          { type: "required", params: ["Please select an option"] },
          { type: "ensure" },
          { type: "trim" },
        ],
      },
    },
    {
      id: "variation02",
      name: "variation02",
      label: "Color",
      type: "select",
      options: [
        { value: "1413611071", label: "Brown" },
        { value: "1413611075", label: "Black" },
        { value: "1984551064", label: "Tan" },
      ],
      validation: {
        schema: "string",
        methods: [
          { type: "required", params: ["Please select an option"] },
          { type: "ensure" },
          { type: "trim" },
        ],
      },
    },
    {
      id: "personalization01",
      name: "personalization01",
      label: "Add your personalization",
      helperText: `Example only:\n\nFront: PAUL\nInside right: I love you to the moon and back Inside left: I love\nyou more\n\n"no engraving" if you choose "no engraving" option`,
      type: "textarea",
      maxLength: 268,
      validation: {
        schema: "string",
        methods: [
          {
            type: "required",
            params: ["This item requires personalization"],
          },
          { type: "ensure" },
          { type: "trim" },
        ],
      },
    },
  ],
};
const seller = { name: "StayFinePersonalized", totalSales: 82878 };

export function ProductInformation({ onAddToCart, className }) {
  const { values, errors, onFormFieldChange, onSubmit } = useForm(
    product.fields
  );

  function getDiscount(original, sale) {
    return original - sale;
  }

  function getDiscountPercentage(original, sale) {
    return (original - sale) / original;
  }

  function handleFieldChange(event) {
    onFormFieldChange(event.target.name, event.target.value);
  }

  async function handleFormSubmit(event) {
    const productData = {
      id: product.id,
      variations: Object.keys(values).reduce((acc, key) => {
        if (key.includes("variation"))
          return [...acc, { id: key, value: values[key] }];
        return acc;
      }, []),
      personalizations: Object.keys(values).reduce((acc, key) => {
        if (key.includes("personalization"))
          return [...acc, { id: key, value: values[key] }];
        return acc;
      }, []),
    };
    onAddToCart(productData);
  }

  function renderFormElement(field) {
    switch (field.type) {
      case "select":
        return (
          <SelectField
            value={values[field.id]}
            onChange={handleFieldChange}
            errors={errors[field.id]}
            name={field.id}
            label={field.label}
            id={field.id}
            key={field.id}
          >
            {field.options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
        );

      case "textarea":
        return (
          <TextareaField
            value={values[field.id]}
            onChange={handleFieldChange}
            errors={errors[field.id]}
            maxLength={field.maxLength}
            id={field.id}
            name={field.id}
            instructions={field.helperText}
            key={field.id}
          />
        );

      default:
        return null;
    }
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

      <form {...onSubmit(handleFormSubmit)} className={styles.productOptions}>
        {product.fields.map(renderFormElement)}

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
