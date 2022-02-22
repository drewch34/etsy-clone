import styles from "./ProductInformation.module.scss";
import { formatCurrency, formatInteger, formatPercent } from "../../utils";
import { Popover } from "../Popover/Popover";
import { SelectField } from "../SelectField/SelectField";
import { TextareaField } from "../TextareaField/TextareaField";
import { useForm } from "../../hooks/useForm";
import { Accordion } from "../Accordion/Accordion";
import { AccordionSummary } from "../AccordionSummary/AccordionSummary";
import { AccordionDetails } from "../AccordionDetails/AccordionDetails";

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
  stock: 10,
  estimatedDeliveryDate: {
    min: new Date("02/26/2022").toISOString(),
    max: new Date("03/03/2022").toISOString(),
  },
  fields: [
    {
      id: "variation01",
      name: "variation01",
      label: "Engraving?",
      type: "select",
      options: [
        { value: "", label: "Select an option" },
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
        { value: "", label: "Select an option" },
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

const quantityField = {
  id: "quantity",
  name: "quantity",
  label: "Quantity",
  type: "select",
  initialValue: 1,
  options: Array.from(Array(product.stock)).map((_, index) => ({
    value: index + 1,
    label: index + 1,
  })),
  validation: {
    schema: "string",
    methods: [
      { type: "required", params: ["Please select an option"] },
      { type: "ensure" },
      { type: "trim" },
    ],
  },
};

export function ProductInformation({ onAddToCart, className }) {
  const { values, subscribe, onSubmit } = useForm([
    ...product.fields,
    quantityField,
  ]);

  function getDiscount(original, sale) {
    return original - sale;
  }

  function getDiscountPercentage(original, sale) {
    return (original - sale) / original;
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

    onAddToCart({
      product: productData,
      addQuantity: Number(values.quantity) || 1,
    });
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(Date.parse(date));
  }

  function renderFormElement(field) {
    switch (field.type) {
      case "select":
        return (
          <SelectField
            {...subscribe(field.id)}
            label={field.label}
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
            {...subscribe(field.id)}
            label={field.label}
            instructions={field.helperText}
            maxLength={field.maxLength}
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
        {[...product.fields, quantityField].map(renderFormElement)}

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
          <div>
            <span aria-hidden="true" className="icon xl shippingTruck"></span>
            <p>
              <span className={styles.textBold}>
                Arrives by{" "}
                <Popover
                  buttonLabel={`${formatDate(
                    product.estimatedDeliveryDate.min
                  )}-
                ${formatDate(product.estimatedDeliveryDate.max)}`}
                  position="leftStart"
                >
                  {
                    "The estimated delivery date is based on your purchase date, the recipient's location (actual or inferred), the seller's processing time and location, and the shipping carrier.\n\nOther factors—such as shipping carrier delays or placing an order on weekend/holiday—may push the arrival of your item beyond this date."
                  }
                </Popover>
              </span>{" "}
              if you order today.
            </p>
          </div>
        </div>
      </form>

      <div>
        <Accordion startExpanded={true}>
          <AccordionSummary
            expandIcon={
              <span aria-hidden="true" className="icon lg chevronDown"></span>
            }
          >
            Highlights
          </AccordionSummary>
          <AccordionDetails>
            <p>content</p>
            <p>content</p>
          </AccordionDetails>
        </Accordion>

        <Accordion startExpanded={true}>
          <AccordionSummary
            expandIcon={
              <span aria-hidden="true" className="icon lg chevronDown"></span>
            }
          >
            Description
          </AccordionSummary>
          <AccordionDetails>
            <p>content</p>
          </AccordionDetails>
        </Accordion>

        <Accordion startExpanded={true}>
          <AccordionSummary
            expandIcon={
              <span aria-hidden="true" className="icon lg chevronDown"></span>
            }
          >
            Shipping and return policies
          </AccordionSummary>
          <AccordionDetails>
            <p>content</p>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={
              <span aria-hidden="true" className="icon lg chevronDown"></span>
            }
          >
            FAQs
          </AccordionSummary>
          <AccordionDetails>
            <p>content</p>
          </AccordionDetails>
        </Accordion>

        <Accordion startExpanded={true}>
          <AccordionSummary
            expandIcon={
              <span aria-hidden="true" className="icon lg chevronDown"></span>
            }
          >
            Meet your seller
          </AccordionSummary>
          <AccordionDetails>
            <p>content</p>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}
