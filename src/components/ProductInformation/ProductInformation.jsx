import styles from "./ProductInformation.module.scss";
import { formatCurrency, formatInteger, formatPercent } from "../../utils";
import { Popover } from "../Popover/Popover";
import { SelectField } from "../SelectField/SelectField";
import { TextareaField } from "../TextareaField/TextareaField";
import { useForm } from "../../hooks/useForm";
import { Accordion } from "../Accordion/Accordion";
import { AccordionSummary } from "../AccordionSummary/AccordionSummary";
import { AccordionDetails } from "../AccordionDetails/AccordionDetails";
import { TruncateContent } from "../TruncateContent/TruncateContent";
import { ProductShippingDetails } from "../ProductShippingDetails/ProductShippingDetails";
import { useState } from "react";

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
  highlights: [{ id: "handmade", label: "Handmade" }],
  description: `🔥 STYLISH, SPACIOUS, SAFE and SENTIMENTAL. With handcrafted exquisite top-grain leather from Argentina, RFID blocking technology, and the option for custom engraving, this bifold wallet makes the perfect custom-made gift for him.

  Add initials, favorite catchphrase, quote or inside Joke, even logo to make it extra unique and special! 😍
  
  🌈Color Difference: The first 5 pictures is "Brown", the next 3 is "Black", the last two is "Tan". Black and Tan has a more smooth surface. And tan is lighter than brown.
  
  👉 ENGRAVED MESSAGE INSTRUCTIONS
  
  At the last page of checkout, below the Submit Order button, there is a box where you can “Add an optional NOTE to the seller.” Simply leave your engraving instructions there and you are all set! If you do miss this step, simply shoot us an message and we will make it right!
  
  
  - For " Front Side Only ": The ENGRAVED MESSAGE can be either name or initials.
  For logo, there's an extra charge of $10, and please contact us and send a picture with a white background.
  
  - For " Inside Right or Inside Left " : The ENGRAVED MESSAGE can be up to 5 lines. Approx. 4-5 words per line. We will center the message, except for 2-3 letters initials we will engrave at the corner.
  
  *We are only able to engrave exactly what the customer put. We're not responsible for any typo provided by the customer. If two slightly different version is provided, the typed instruction overrides the original version.
  Please make sure everything is correct before you submit the order. We'll do our best to answer any change request, but no guarantee for any changes.
  
  
  Every single one of our beautiful wallet is handcrafted to perfection and subject to rigorous quality control standards. It comes in a quality, function and style that are unavailable from competing product:
  
  - It's made with top grain ARGENTINIAN LEATHER that has a pleasant smell. It softens naturally with use and ages beautifully with time. The inside pocket material is nylon fabric.
  
  -Each of the 12 card slot is equipped with RFID BLOCKING lining, keeping your personal and financial info safe. 👮
  
  
  -Measuring only 4.3" x 3.5" when closed, our wallet has a huge capacity of 10 card slots in total-
  8 visible card slots, 2 hidden slots underneath each side, and 1 NON-REMOVABLE Flip up ID Windows, which you can put ID or photos on both sides. It even has a split billfold to keep your money and receipts organized.👍
  
  -Our wallet delivers the function and the style like any expensive wallet out there, but only at a fraction of the cost. As a U.S.-based family business, we are passion about cutting out all the middleman so we can offer you the best deal possible.💰
  
  
  Our wallet makes a perfect gift for him on his Birthday, Anniversary, Graduation, Wedding, Thanksgiving, Christmas, or Father's Day, or even just a treat for yourself! Click “Add to Cart” right now and order yours today!`,
  shipping: {
    city: "Redding",
    state: "CA",
  },
  deliveryLeadTime: "1-2 business days",
};

const seller = {
  id: "seller_id_1",
  name: "StayFinePersonalized",
  totalSales: 82878,
  returnAndExchanges: [
    {
      title: "I gladly accept exchanges",
      message:
        "Contact me within: 14 days of delivery Ship items back within: 30 days of delivery",
    },
    {
      title: "I don't accept returns or cancellations",
      message:
        "But please contact me if you have any problems with your order.",
    },
    {
      title: "Conditions of return",
      message:
        "Buyers are responsible for return shipping costs. If the item is not returned in its original condition, the buyer is responsible for any loss in value.",
    },
  ],
  paymentMethods: [
    { id: "PayPal", name: "PayPal" },
    { id: "Master", name: "MasterCard" },
    { id: "Visa", name: "Visa" },
    { id: "Amex", name: "American Express" },
    { id: "Discover", name: "Discover" },
    { id: "Klarna", name: "Klarna" },
    { id: "GiftCard", name: "Gift Card" },
  ],
  faq: [
    {
      question: "Gift wrapping and packaging",
      answer:
        "We surely can do personal/gift notes for you, just leave the instruction when you place the order, and we will copy & paste and include it on a nice piece of designed postcard . 🎁\n\nHowever, we don't offer gift wrap or personalization on the box. Our box is made of tan colored cardboard and has our logo “Stay Fine” on top and it’s really easy to wrap :)",
    },
    {
      question: "Custom and personalized orders",
      answer:
        "We use laser engraving⚡ , which means the words are carved into the leather that looks dark and black, and it lasts forever.\n\nPlease take care of your text since we're not responsible for any typo provided by the customer. If two slightly different version is provided, the typed instruction overrides the original version.",
    },
    {
      question: "Care instructions",
      answer:
        "It's good practice to gently wipe or brush your purse regularly to remove the daily build up of dust and dirt which can build up.\nDo spot clean any stains with warm water.\nDon't machine wash leather.\nTry your best not to get it wet wherever possible.\n\nI hope this is helpful!! :)",
    },
    {
      question: "Wholesale availability",
      answer:
        "If you're first time buyer ordering more than 3 items, we're glad to give 10% off 😊 Feel free to message me!\n\nTHANK YOU for considering us to be part of something so special in your life.",
    },
    {
      question: "If we mis-engraved your item??",
      answer:
        "We hold ourselves for high standard!! But mistake may happens since we're human beings...\n\nIf we mis-engraved your item, we're glad to send you a replacement, or refund the engraving fee, whichever you choose. However, we don't do refund for personalized item per our store policy, thanks!! :)",
    },
    {
      question: "Why my order got cancel?",
      answer: `We always message the customer before we cancel any order that has an issue like the following:\n1. Engraving fee not matching the instruction.\nFor example, you paid "FRONT & INSIDE RIGHT" but didn't give us any engraving instruction, or only give us the one for FRONT.\n\n2. There's some countries we don't ship except if you're willing to take full responsibility of potential mail lost risk:\n\nSpain, Austria, Belgium, Russia, Denmark, India, Egypt, Pakistan, Dubai, Indonesia, Philipine; Peru; Bulgaria; Mexico; South Africa, Brazil, Nepal, Colombia\n\n3. Or any issue that we needs confirmation from you before we can process the order. We may cancel in 2-3 days if we don't hear from you.\n\nPlease feel free to re-order again :)`,
    },
  ],
};

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
  const [faqAccordionExpanded, setFaqAccordionExpanded] = useState();

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

  function handleExpandFaqAccordion(event) {
    setFaqAccordionExpanded(event.target.id);
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
              <span aria-hidden="true" className="icon md chevronDown"></span>
            }
          >
            Highlights
          </AccordionSummary>
          <AccordionDetails>
            <ul className={styles.highlights}>
              {product.highlights.map((highlight) => (
                <li key={highlight.id}>
                  <span className={styles.highlightItem}>
                    <span
                      aria-hidden="true"
                      className={`icon md ${highlight.id}`}
                    ></span>{" "}
                    {highlight.label}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion startExpanded={true}>
          <h2>
            <AccordionSummary
              expandIcon={
                <span aria-hidden="true" className="icon md chevronDown"></span>
              }
            >
              Description
            </AccordionSummary>
          </h2>

          <AccordionDetails>
            <TruncateContent
              expandLabel="Learn more about this item"
              collapseLabel="Less"
            >
              <p className={styles.description}>{product.description}</p>
            </TruncateContent>
          </AccordionDetails>
        </Accordion>

        <Accordion startExpanded={true}>
          <h2>
            <AccordionSummary
              expandIcon={
                <span aria-hidden="true" className="icon md chevronDown"></span>
              }
            >
              Shipping and return policies
            </AccordionSummary>
          </h2>
          <AccordionDetails>
            <ProductShippingDetails
              productId={product.id}
              deliveryLeadTime={product.deliveryLeadTime}
              shipping={product.shipping}
              seller={seller}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <h2>
            <AccordionSummary
              expandIcon={
                <span aria-hidden="true" className="icon md chevronDown"></span>
              }
            >
              FAQs
            </AccordionSummary>
          </h2>
          <AccordionDetails>
            {seller.faq.map((item, i) => (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={
                    <span
                      aria-hidden="true"
                      className="icon md chevronDown"
                    ></span>
                  }
                  id={i}
                  onClick={handleExpandFaqAccordion}
                  collapse={faqAccordionExpanded !== i.toString()}
                >
                  <span className="textSmall">{item.question}</span>
                </AccordionSummary>
                <AccordionDetails>
                  {item.answer.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className={`textLight textSmall ${styles["whiteSpace:preLine"]} ${styles["lineHeight:tallish"]}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion startExpanded={true}>
          <h2>
            <AccordionSummary
              expandIcon={
                <span aria-hidden="true" className="icon md chevronDown"></span>
              }
            >
              Meet your seller
            </AccordionSummary>
          </h2>
          <AccordionDetails>
            <p>content</p>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}
