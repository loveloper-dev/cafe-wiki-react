import React from "react";
import { Select } from "semantic-ui-react";

const countryOptions = [
  { key: "af", value: "af", text: "Afghanistan" },
  { key: "ax", value: "ax", text: "Aland Islands" },
  { key: "al", value: "al", text: "Albania" },
  { key: "dz", value: "dz", text: "Algeria" },
  { key: "as", value: "as", text: "American Samoa" },
  { key: "ad", value: "ad", text: "Andorra" },
  { key: "ao", value: "ao", text: "Angola" },
  { key: "ai", value: "ai", text: "Anguilla" },
  { key: "ag", value: "ag", text: "Antigua" },
  { key: "ar", value: "ar", text: "Argentina" },
  { key: "am", value: "am", text: "Armenia" },
  { key: "aw", value: "aw", text: "Aruba" },
  { key: "au", value: "au", text: "Australia" },
];

const SelectExample = () => (
  <Select placeholder="Select your country" options={countryOptions} />
);

export default SelectExample;
