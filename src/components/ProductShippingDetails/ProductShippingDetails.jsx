import { useState } from "react";
import axios from "axios";

import styles from "./ProductShippingDetails.module.scss";
import { formatCurrency } from "../../utils";
import { useForm } from "../../hooks/useForm";
import { Accordion } from "../Accordion/Accordion";
import { AccordionDetails } from "../AccordionDetails/AccordionDetails";
import { AccordionSummary } from "../AccordionSummary/AccordionSummary";
import { SelectField } from "../SelectField/SelectField";
import { TextField } from "../TextField/TextField";
import { Popover } from "../Popover/Popover";
import { Modal } from "../Modal/Modal";

const COUNTRY_ID_USA = "209";

const countries = {
  61: "Australia",
  79: "Canada",
  103: "France",
  91: "Germany",
  112: "Greece",
  123: "Ireland",
  128: "Italy",
  131: "Japan",
  167: "New Zealand",
  174: "Poland",
  177: "Portugal",
  181: "Russia",
  99: "Spain",
  164: "The Netherlands",
  105: "United Kingdom",
  [COUNTRY_ID_USA]: "United States",
  55: "Afghanistan",
  57: "Albania",
  95: "Algeria",
  250: "American Samoa",
  228: "Andorra",
  56: "Angola",
  251: "Anguilla",
  252: "Antigua and Barbuda",
  59: "Argentina",
  60: "Armenia",
  253: "Aruba",
};

const formFields = [
  {
    id: "countryId",
    name: "countryId",
    label: "Country",
    type: "select",
    initialValue: COUNTRY_ID_USA,
    optionGroups: [
      {
        label: "----------",
        options: [
          "61",
          "79",
          "103",
          "91",
          "112",
          "123",
          "128",
          "131",
          "167",
          "174",
          "177",
          "181",
          "99",
          "164",
          "105",
          COUNTRY_ID_USA,
        ],
      },
      {
        label: "----------",
        options: [
          "55",
          "57",
          "95",
          "250",
          "228",
          "56",
          "251",
          "252",
          "59",
          "60",
          "253",
        ],
      },
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
    id: "postalCode",
    name: "postalCode",
    label: "Postal Code",
    type: "text",
    validation: {
      schema: "string",
      methods: [
        {
          type: "matches",
          params: [
            /(^\d{5}$)|(^\d{5}-\d{4}$)/,
            "Please enter a valid zip code",
          ],
        },
        { type: "ensure" },
        { type: "trim" },
      ],
    },
  },
];

export function ProductShippingDetails({
  productId,
  deliveryLeadTime,
  shipping,
  seller,
}) {
  const {
    values,
    subscribe,
    onSubmit,
    onChange,
    submit,
    unsubscribe,
    resetField,
  } = useForm(formFields);
  const [deliveryInformation, setDeliveryInformation] = useState({});
  const [loading, setLoading] = useState(false);

  function formatDeliveryInformation({ countryId, postalCode }) {
    const country = countries[countryId];
    if (countryId === COUNTRY_ID_USA)
      return `Deliver to ${country}, ${postalCode}`;

    return `Deliver to ${country}`;
  }

  function handleSelectChange(event) {
    if (event.target.value === COUNTRY_ID_USA) {
      resetField("postalCode");
      return;
    }
    submit();
  }

  function handlePostCodeChange(event) {
    submit();
  }

  async function handleSubmit(event) {
    setLoading(true);
    const { data } = await axios.get("/api/estimated-shipping", {
      params: { ...values, productId, sellerId: seller.id },
    });
    setLoading(false);

    setDeliveryInformation({ ...values, ...data });
  }

  function renderFormElement(field) {
    switch (field.type) {
      case "select":
        return (
          <SelectField
            {...subscribe(field.id)}
            {...onChange(handleSelectChange)}
            label={field.label}
            key={field.id}
          >
            {field.optionGroups.map((optionGroup, i) => (
              <optgroup label={optionGroup.label} key={i}>
                {optionGroup.options.map((option) => (
                  <option value={option} key={option}>
                    {countries[option]}
                  </option>
                ))}
              </optgroup>
            ))}
          </SelectField>
        );

      case "text":
        return values["countryId"] === COUNTRY_ID_USA ? (
          <TextField
            {...subscribe(field.id)}
            {...onChange(handlePostCodeChange)}
            label={field.label}
            key={field.id}
          />
        ) : (
          unsubscribe(field.id)
        );

      default:
        return null;
    }
  }

  return (
    <div className={loading ? styles.hideContentWhileLoading : ""}>
      {loading ? <div className={styles.loader}></div> : null}

      <div className={styles.grid}>
        {deliveryInformation.timeline ? (
          <div className={`stackSmall ${styles.estimatedDelivery}`}>
            <Popover
              buttonLabel={
                <span className={"textSmall textGray"}>Estimated arrival</span>
              }
              position="leftStart"
            >
              {`This is an estimate based on the purchase date, the seller's
              location, and processing time, and the shipping destination and
              carrier. \n\n Other factors—such as shipping carrier delays or
              placing an order on weekend/holiday—may push the arrival of your
              item beyond this date.`}
            </Popover>
            <div className={"textExtraLarge textLight textSerif"}>Mar 5-7</div>

            <div className={styles.deliveryTimeline}>
              <p className="stackSmall">
                <span aria-hidden="true" className={styles.firstStep}>
                  <span aria-hidden="true" className="icon sm handmade"></span>
                  <span aria-hidden="true" className={styles.line}></span>
                </span>
                <span className="block">
                  {deliveryInformation.timeline.placement}
                </span>
                <Popover buttonLabel="Order placed">
                  After you place your order, {seller.name} will take{" "}
                  {deliveryLeadTime} to prepare it for shipment.
                </Popover>
              </p>

              <p className={`stackSmall ${styles.textAlignCenter}`}>
                <span aria-hidden="true" className={styles.firstStep}>
                  <span aria-hidden="true" className={styles.line}></span>
                  <span aria-hidden="true" className="icon sm truck"></span>
                  <span aria-hidden="true" className={styles.line}></span>
                </span>
                <span className="block">
                  {deliveryInformation.timeline.shipment}
                </span>
                <Popover buttonLabel="Order ships">
                  {seller.name} puts your order in the mail.
                </Popover>
              </p>

              <p className={`stackSmall ${styles.textAlignRight}`}>
                <span aria-hidden="true" className={styles.firstStep}>
                  <span aria-hidden="true" className={styles.line}></span>
                  <span aria-hidden="true" className="icon sm package"></span>
                </span>
                <span className="block">
                  {deliveryInformation.timeline.estimatedDelivery}
                </span>
                <Popover buttonLabel="Order ships" position="left">
                  Estimated to arrive at your doorstep{" "}
                  {deliveryInformation.timeline.estimatedDelivery}!
                </Popover>
              </p>
            </div>
          </div>
        ) : (
          <div className="stackSmall">
            <span className={"textSmall textGray"}>Ready to ship in</span>
            <div className={"textExtraLarge textLight textSerif"}>
              {deliveryLeadTime}
            </div>
          </div>
        )}

        {deliveryInformation.estimatedCost ? (
          <div className="stackSmall">
            <span className="textSmall textGray">Cost to ship</span>
            <div className={"textExtraLarge textLight textSerif"}>
              {formatCurrency(
                deliveryInformation.estimatedCost,
                "USD",
                "en-US"
              )}
            </div>
          </div>
        ) : null}
        <div className="stackSmall">
          <span className="textSmall textGray">Exchanges</span>
          <div className={"textExtraLarge textLight textSerif"}>Accepted</div>
        </div>
      </div>

      <p className={`${styles.bannerGreen} textSmall`}>
        Etsy offsets carbon emissions from shipping and packaging on this
        purchase.
      </p>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <span aria-hidden="true" className="icon md chevronDown"></span>
          }
          minimal={true}
          collapse={loading}
        >
          <span className="textSmall">
            {deliveryInformation.countryId
              ? formatDeliveryInformation(deliveryInformation)
              : "Get shipping cost"}
          </span>
        </AccordionSummary>

        <AccordionDetails>
          <form {...onSubmit(handleSubmit)} className="stack">
            {formFields.map(renderFormElement)}
          </form>
        </AccordionDetails>
        <p className="textSmall">
          Ships from {shipping.city}, {shipping.state}
        </p>
      </Accordion>

      <Modal
        openButton={
          <button className={styles.button}>View shop policies</button>
        }
        closeButton={
          <button aria-label="Close shop policies">
            <span
              aria-hidden="true"
              className="block icon md closeWhite"
            ></span>
          </button>
        }
      >
        <div className="stackSmall">
          <h2 className="resetMargins text:xxl textLight textSerif">
            Shop policies for {seller.name}
          </h2>
          <p className="textSmall">Last updated on Sep 3, 2020</p>
        </div>

        <p className="textMedium textBold marginBlockStart:lg">
          Return and Exchanges
        </p>

        {seller.returnAndExchanges.map((item, i) => (
          <div id={i} className="stackSmall">
            <h3 className="resetMargins textNormal">{item.title}</h3>
            <p className="textLight textSmall">{item.message}</p>
          </div>
        ))}

        <div className="stack">
          <h3 className="resetMargins textMedium marginBlockStart:lg">
            Payments
          </h3>
          <p className="textSmall">
            <span aria-hidden="true" className="icon sm lock"></span>
            <span className={styles.padding}>Secure options</span>
          </p>

          <ul className={styles.cards}>
            {seller.paymentMethods.map((payment) => (
              <li key={payment.id} aria-label={payment.name}>
                <span
                  aria-hidden="true"
                  className={`icon lg card${payment.id}`}
                ></span>
              </li>
            ))}
          </ul>

          <p className="textLight textGray">
            Accepts Etsy Gift Cards and Etsy Credits
          </p>

          <p className="textLight textSmall textGray">
            Etsy keeps your payment information secure. Etsy shops never receive
            your credit card information.
          </p>
        </div>
      </Modal>
    </div>
  );
}
