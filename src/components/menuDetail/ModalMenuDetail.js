import React, { useEffect, useState } from "react";
import { Button, Header, Image, Label, Modal, Rating } from "semantic-ui-react";
import axios from "axios";
import "./ModalMenuDatail.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as menuActions } from "../../redux/reducers/menuList";

function ModalMenuDetail(props) {
  const { open, setOpen } = props;

  const { menu_idx } = props;

  const [isLoading, setLoading] = useState(true);

  const [info, setInfo] = useState({});

  const [isShowRatingStar, setIsShowRatingStar] = useState(false);

  const [starRating, setStarRating] = useState(5);

  const isLogin = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    let param = {
      menu_idx: menu_idx,
    };

    if (isLogin) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      param = {
        ...param,
        ...userInfo,
      };
    }

    axios({
      method: "POST",
      // url: "https://cafe-wiki-spring.herokuapp.com/menus",
      url: `http://localhost:8080/menus/${menu_idx}`,
      data: param,
    }).then((res) => {
      const allergyArr =
        res.data.resultData.menu_allergy != ""
          ? res.data.resultData.menu_allergy.split(",")
          : [];

      const allergyMap = getAllergyMapArr(allergyArr, param);

      let resultData = res.data.resultData;
      resultData.menu_allergy = allergyMap;
      setInfo(res.data.resultData); // 여기서는 info 찍어볼 수 없음
      setLoading(false); // 다시 렌더 돌면서 return 안에 있는걸 그림
    });
  }, []); // component mounted

  function getAllergyMapArr(menu_allergyArr, param) {
    let userAllergyInfo = [];
    if (param.user_allergy != null && param.user_allergy != "") {
      userAllergyInfo = param.user_allergy.split(",");
    }

    let returnAllergyMapArr = JSON.parse(
      localStorage.getItem("allergyInfo")
    ).filter((allergy) => {
      for (let i = 0; i < menu_allergyArr.length; i++) {
        if (menu_allergyArr[i] == allergy.value) {
          return allergy;
        }
      }
    });

    if (userAllergyInfo.length > 0) {
      const changedMenuAllergyMapArr = returnAllergyMapArr.map((allergy) => {
        for (let i = 0; i < userAllergyInfo.length; i++) {
          if (userAllergyInfo[i] == allergy.value) {
            allergy.isDanger = true;
          }
        }
        return allergy;
      });

      returnAllergyMapArr = changedMenuAllergyMapArr;
    }

    return returnAllergyMapArr;
  }

  function ratingHeart(e, data) {
    if (isLogin) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const param = {
        ...userInfo,
        menu_idx: info.menu_idx,
      };
      axios({
        method: "POST",
        url: `http://localhost:8080/rating/heart/${
          info.is_clicked_heart ? "cancel" : "save"
        }`,
        data: param,
      }).then((res) => {
        // detail 값 다시 불러와서 채움
        const allergyArr =
          res.data.resultData.menu_allergy != ""
            ? res.data.resultData.menu_allergy.split(",")
            : [];

        const allergyMap = getAllergyMapArr(allergyArr, param);

        let resultData = res.data.resultData;
        resultData.menu_allergy = allergyMap;
        setInfo(res.data.resultData);

        // list쪽 수정
        dispatch(menuActions.updateMenuList(res.data.resultData));
      });
    }
  }

  const showRatingStar = (e, data) => {
    if (!info.is_clicked_star && isLogin) {
      setIsShowRatingStar(!isShowRatingStar);
    }
  };

  const handleRate = (e, { rating, maxRating }) => {
    setStarRating(rating);
  };

  const saveStarRating = (e, data) => {
    if (isLogin) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const param = {
        ...userInfo,
        menu_idx: info.menu_idx,
        star_rating: starRating,
      };
      axios({
        method: "POST",
        url: `http://localhost:8080/rating/star/save`,
        data: param,
      }).then((res) => {
        // detail 값 다시 불러와서 채움
        const allergyArr =
          res.data.resultData.menu_allergy != ""
            ? res.data.resultData.menu_allergy.split(",")
            : [];

        const allergyMap = getAllergyMapArr(allergyArr, param);

        let resultData = res.data.resultData;
        resultData.menu_allergy = allergyMap;
        setInfo(res.data.resultData);

        // list쪽 수정
        dispatch(menuActions.updateMenuList(res.data.resultData));

        // 닫기
        setIsShowRatingStar(false);
      });
    }
  };

  if (isLoading) {
    return null;
  } // else 없어도 됨
  return (
    <Modal id="menuDatail" onClose={() => setOpen()} open={open}>
      <Modal.Header className="flex-container justify-sb">
        음료 상세정보
        <button className="btn" onClick={() => setOpen(false)}>
          X
        </button>
      </Modal.Header>
      <Modal.Content className="flex-container">
        <div>
          <div className="brand-logo-wrap mg-bt-1">
            <img
              src={`${process.env.PUBLIC_URL}/images/brand-logo/${info.brand_nm_en}.png`}
            />
          </div>
          <div className="menu-image-wrap">
            {/*<img src={`${process.env.PUBLIC_URL}/images/menu-info/62.jpeg`} />*/}
            <img src={info.menu_img_url} />
          </div>
        </div>
        <div>
          <h3 className="menu-name-ko mg-bt-half">{info.menu_nm_ko}</h3>
          <h4 className="menu-name-en mg-bt-2">{info.menu_nm_en}</h4>
          <div className="menu-icon-wrap">
            <Button
              as="div"
              className={`btn-label caffeine ${
                info.menu_has_caffeine ? "on" : ""
              }`}
              labelPosition="right"
            >
              <Button>
                {info.menu_has_caffeine ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/menu-info/caffeine_2.png`}
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/menu-info/no_caffeine.png`}
                  />
                )}
              </Button>
              <Label as="a" basic pointing="left">
                {info.menu_has_caffeine ? "Caffeine drink" : "Caffeine Free"}
              </Label>
            </Button>
            <Button
              as="div"
              className={`btn-label star ${info.is_clicked_star ? "on" : ""}`}
              labelPosition="right"
              onClick={showRatingStar}
              value={info.is_clicked_star}
            >
              <Button>
                {info.is_clicked_star ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/menu-info/star_4.png`}
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/menu-info/empty_star.png`}
                  />
                )}
              </Button>
              <Label as="a" basic pointing="left">
                {info.menu_star_rating}
              </Label>
            </Button>
            <div className={`star-rating-wrap ${isShowRatingStar ? "on" : ""}`}>
              <p className="notice">※ 저장 이후 별점 수정 불가</p>
              <Rating
                maxRating={5}
                defaultRating={starRating}
                icon="star"
                size="massive"
                onRate={handleRate}
              />
              <button
                type="button"
                className="btn-save"
                onClick={saveStarRating}
              >
                별점 저장
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={showRatingStar}
              >
                취소
              </button>
            </div>
            <Button
              as="div"
              className={`btn-label heart ${info.is_clicked_heart ? "on" : ""}`}
              labelPosition="right"
              onClick={ratingHeart}
              value={info.is_clicked_heart}
            >
              <Button>
                {info.is_clicked_heart ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/menu-info/heart.png`}
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/menu-info/no_heart.png`}
                  />
                )}
              </Button>
              <Label as="a" basic pointing="left">
                {info.menu_heart_rating}
              </Label>
            </Button>
          </div>
          <p className="menu-desc">{info.menu_desc}</p>
          <div
            className={`menu-allergy-wrap ${
              info.menu_allergy.length > 0 ? "" : "hide"
            } `}
          >
            <p className="menu-allergy-title">알레르기 정보</p>
            <ul>
              {info.menu_allergy.map((allergy) => {
                return (
                  <li
                    key={allergy.value}
                    className={allergy.isDanger ? "danger" : ""}
                  >
                    {allergy.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default ModalMenuDetail;
