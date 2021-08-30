import React, { useEffect, useState } from "react";
import { Button, Header, Image, Label, Modal } from "semantic-ui-react";
import axios from "axios";
import "./ModalMenuDatail.css";

function ModalMenuDetail(props) {
  const { open, setOpen } = props;

  const { menu_idx } = props;

  const [isLoading, setLoading] = useState(true);

  const [info, setInfo] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      // url: "https://cafe-wiki-spring.herokuapp.com/menus",
      url: `http://localhost:8080/menus/${menu_idx}`,
      // responseType: "type",
    }).then((res) => {
      const allergyArr =
        res.data.resultData.menu_allergy != null
          ? res.data.resultData.menu_allergy.split("@")
          : [];
      let resultData = res.data.resultData;
      resultData.menu_allergy = allergyArr;
      setInfo(res.data.resultData); // 여기서는 info 찍어볼 수 없음
      setLoading(false); // 다시 렌더 돌면서 return 안에 있는걸 그림
    });
  }, []); // component mounted

  function ratingHeart(param) {
    console.log("누름", param);
  }

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
            <img src={`${process.env.PUBLIC_URL}/images/menu-info/62.jpeg`} />
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
              <Button>{info.menu_has_caffeine ? "a" : "b"}</Button>
              <Label as="a" basic pointing="left">
                {info.menu_has_caffeine ? "Caffeine drink" : "Caffeine Free"}
              </Label>
            </Button>
            <Button
              as="div"
              className={`btn-label star ${info.is_clicked_star ? "on" : ""}`}
              labelPosition="right"
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
            <Button
              as="div"
              className={`btn-label heart ${info.is_clicked_heart ? "on" : ""}`}
              labelPosition="right"
              onClick={ratingHeart}
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
          <div className="menu-allergy-wrap">
            <p className="menu-allergy-title">알레르기 정보</p>
            <ul>
              {info.menu_allergy.map((allergy) => {
                return <li key={allergy}>{allergy}</li>;
              })}
            </ul>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default ModalMenuDetail;
