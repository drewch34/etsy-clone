import styles from "./ProductShippingDetails.module.scss";
import { Accordion } from "../Accordion/Accordion";
import { AccordionDetails } from "../AccordionDetails/AccordionDetails";
import { AccordionSummary } from "../AccordionSummary/AccordionSummary";
import { useForm } from "../../hooks/useForm";
import { SelectField } from "../SelectField/SelectField";
import { TextField } from "../TextField/TextField";
import { useState } from "react";
import axios from "axios";
import { formatCurrency } from "../../utils";

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
  sellerId,
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
      params: { ...values, productId, sellerId },
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
        {deliveryLeadTime ? (
          <div className="stackSmall">
            <span className={"textSmall textGray"}>Ready to ship in</span>
            <div className={"textExtraLarge textLight textSerif"}>
              {deliveryLeadTime}
            </div>
          </div>
        ) : null}
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

      {/* <div>
        <button className={styles.button}>View shop policies</button>
        <div>modal</div>
      </div> */}
    </div>
  );
}
