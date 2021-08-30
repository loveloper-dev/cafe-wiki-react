import React, { useCallback, useEffect, useRef, useState } from "react";
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

const searchInfoInitialState = {
  brand_idx: 0,
};

// @title 메뉴 아이템 리스트 가져오는 API 호출 함수
function getMenuList(params) {
  return axios({
    method: "POST",
    url: "http://localhost:8080/menus",
    data: params,
  });
}

function SearchBox() {
  const [isLoading, setLoading] = useState(false); // loading state
  const dispatch = useDispatch();

  //state = store, user = reducer 종류, isLogin = state이름
  const isLogin = useSelector((state) => state.user.isLogin);

  const [isAllergyFiltering, setIsAllergyFiltering] = useState(false);
  const [isShowOnlyHeartDrink, setIsShowOnlyHeartDrink] = useState(false);
  const [searchInfo, setSearchInfo] = useState(searchInfoInitialState);
  const [keyword, setKeyword] = useState("");
  const { brand_idx } = searchInfo;

  useEffect(() => {
    initSearchInfo();
    setKeyword("");

    if (isLogin) {
      setIsShowOnlyHeartDrink(true);
      setIsAllergyFiltering(true);
    } else {
      setIsShowOnlyHeartDrink(false);
      setIsAllergyFiltering(false);
    }
  }, [isLogin]);

  useEffect(() => {
    search();
  }, [searchInfo, isShowOnlyHeartDrink, isAllergyFiltering]);

  const handleFilteringAllergy = (key) => (e, data) => {
    if (key === "heart") {
      setIsShowOnlyHeartDrink(data.checked);
      setSearchInfo({
        ...searchInfo,
        isShowOnlyHeartDrink: data.checked,
      });
    } else {
      setIsAllergyFiltering(data.checked);
      setSearchInfo({
        ...searchInfo,
        isAllergyFiltering: data.checked,
      });
    }
  };

  const handleChangeKeyword = (key) => (e, data) => {
    if (key === "keyword") {
      setKeyword(data.value);
    } else {
      setSearchInfo((prevSearchInfo) => ({
        ...prevSearchInfo,
        [key]: data.value,
      }));
    }
  };

  // @title 검색 옵션 초기화 함수
  const initSearchInfo = () => {
    setSearchInfo(searchInfoInitialState);
  };

  const search = () => {
    setLoading(true);
    if (isLogin) {
      // 로그인시 API 요청
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.jwt = localStorage.getItem("jwt"); // token 유효성 검사해야 됨

      const params = {
        ...searchInfo,
        keyword,
        isLogin: true,
        isAllergyFiltering: isAllergyFiltering,
        isShowOnlyHeartDrink: isShowOnlyHeartDrink,
        userInfo,
      };

      getMenuList(params).then((res) => {
        setLoading(false);
        dispatch(menuActions.setMenuList(res.data.resultData));
      });
    } else {
      // 비 로그인시 API 요청
      const params = {
        isLogin: false,
        ...searchInfo,
        keyword,
        isShowOnlyHeartDrink: false,
        isAllergyFiltering: false,
      };

      getMenuList(params).then((res) => {
        setLoading(false);
        dispatch(menuActions.setMenuList(res.data.resultData));
      });
    }
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
          value={brand_idx}
          options={countryOptions}
          onChange={handleChangeKeyword("brand_idx")}
        />
        <Input
          className="search-input"
          placeholder="음료 메뉴명 혹은 키워드"
          value={keyword}
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
            <Checkbox
              toggle
              checked={isShowOnlyHeartDrink}
              onClick={handleFilteringAllergy("heart")}
            />
            <span className="txt-brown">❤️ 모아보기</span>
          </Segment>
          <Segment compact>
            <Checkbox
              toggle
              checked={isAllergyFiltering}
              onClick={handleFilteringAllergy("allergy")}
            />
            <span className="txt-brown">알러지 필터링</span>
          </Segment>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchBox;
