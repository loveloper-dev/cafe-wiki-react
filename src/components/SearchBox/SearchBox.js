import React, { useEffect, useState } from "react";
import { Select } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Button, Checkbox, Segment } from "semantic-ui-react";
import "./SearchBox.css";
import { ReactComponent as Coffee } from "./coffee-cup-svg_1.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as menuActions } from "../../redux/reducers/menuList";
import Loading from "../loading/Loading";

const countryOptions = [
  { key: 0, value: 0, text: "모든 브랜드" },
  { key: 1, value: 1, text: "스타벅스" },
  { key: 2, value: 2, text: "이디야 커피" },
  { key: 3, value: 3, text: "할리스 커피" },
];

function SearchBox() {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [searchInfo, setSearchInfo] = useState({
    brand_idx: 0,
    keyword: "",
  });

  //state = store, user = reducer 종류, isLogin = state이름
  const isLogin = useSelector((state) => state.user.isLogin);

  const handleFilteringAllergy = (key) => (e, data) => {
    console.log("[SearchBox] handleFilteringAllergy key: ", key);
    console.log("[SearchBox] handleFilteringAllergy data: ", data.checked);
  };

  const handleChangeKeyword = (key) => (e, data) => {
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      [key]: data.value,
    }));
  };

  const search = () => {
    setLoading(true);
    axios({
      method: "POST",
      // url: "https://cafe-wiki-spring.herokuapp.com/menus",
      url: "http://localhost:8080/menus",
      data: searchInfo,
    }).then((res) => {
      setLoading(false);
      dispatch(menuActions.setMenuList(res.data));
    });
  };

  return (
    <div className="search-box-wrap">
      {isLoading ? <Loading /> : <br />}
      <div className="search-box flex-container justify-sb">
        <div className="big-coffee">
          <Coffee height="3.5rem" />
        </div>
        <Select
          className="select"
          placeholder="모든 브랜드"
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
        <Button
          id="btnSearch"
          type="button"
          className="txt-white"
          onClick={search}
        >
          검색
        </Button>
      </div>
      {isLogin ? (
        <div className="search-condition-wrap">
          <Segment compact>
            <Checkbox toggle onClick={handleFilteringAllergy("heart")} />
            heart 우선
          </Segment>
          <Segment compact>
            <Checkbox toggle onClick={handleFilteringAllergy("allergy")} />
            알러지 필터링
          </Segment>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchBox;
