import React from "react";
import { Select } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "./SearchBox.css";
// import { ReactComponent as Coffee } from "./preview.svg";
import { ReactComponent as Coffee } from "./coffee-cup-svg_1.svg";

const countryOptions = [
  { key: "af", value: "af", text: "투썸플레이스" },
  { key: "ax", value: "ax", text: "스타벅스" },
  { key: "al", value: "al", text: "이디야커피" },
  { key: "dz", value: "dz", text: "Algeria" },
  { key: "as", value: "as", text: "American Samoa" },
  { key: "ad", value: "ad", text: "Andorra" },
  { key: "ao", value: "ao", text: "Angola" },
  { key: "ai", value: "ai", text: "Anguilla" },
];

function SearchBox() {
  return (
    <div className="search-box flex-container justify-sb">
      <div className="big-coffee">
        <Coffee height="3.5rem" />
      </div>
      <Select
        className="select"
        placeholder="Select your country"
        options={countryOptions}
      />
      <Input className="search-input" placeholder="Search..." />
      <Button id="inputSearch">
        <span>✛</span> 상세검색
      </Button>
      <Button id="btnSearch" className="txt-white">
        검색
      </Button>
    </div>
  );
}

export default SearchBox;
