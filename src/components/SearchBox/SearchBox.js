import React, { useState } from "react";
import { Select } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "./SearchBox.css";
import { ReactComponent as Coffee } from "./coffee-cup-svg_1.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators as menuActions } from "../../redux/reducers/menuList";

const countryOptions = [
  { key: 0, value: 0, text: "전체" },
  { key: 1, value: 1, text: "스타벅스" },
  { key: 2, value: 2, text: "이디야 커피" },
  { key: 3, value: 3, text: "할리스 커피" },
];

function SearchBox() {
  const dispatch = useDispatch();

  const [searchInfo, setSearchInfo] = useState({
    brand_idx: 0,
    keyword: "",
  });

  const handleChangeKeyword = (key) => (e, data) => {
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      [key]: data.value,
    }));
  };

  const search = () => {
    axios({
      method: "POST",
      // url: "https://cafe-wiki-spring.herokuapp.com/menus",
      url: "http://localhost:8080/menus",
      data: searchInfo,
    }).then((res) => {
      dispatch(menuActions.setMenuList(res.data));
    });
  };

  return (
    <div className="search-box flex-container justify-sb">
      <div className="big-coffee">
        <Coffee height="3.5rem" />
      </div>
      <Select
        className="select"
        placeholder="브랜드"
        options={countryOptions}
        onChange={handleChangeKeyword("brand_idx")}
      />
      <Input
        className="search-input"
        placeholder="음료 메뉴명 혹은 키워드"
        onChange={handleChangeKeyword("keyword")}
      />
      <Button id="inputSearch">
        <span>✛</span> 상세검색
      </Button>
      <Button id="btnSearch" className="txt-white" onClick={search}>
        검색
      </Button>
    </div>
  );
}

export default SearchBox;
