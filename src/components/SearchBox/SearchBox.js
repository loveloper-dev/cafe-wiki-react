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
];

function SearchBox() {
  return (
    <div className="search-box flex-container justify-sb">
      <div className="big-coffee">
        <Coffee height="3.5rem" />
      </div>
      <Select
        className="select"
        placeholder="브랜드"
        options={countryOptions}
      />
      <Input className="search-input" placeholder="음료 메뉴명 혹은 키워드" />
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
