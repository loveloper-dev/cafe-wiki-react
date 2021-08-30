import React, { useState } from "react";
import "./MenuItem.css";
import ModalMenuDetail from "../menuDetail/ModalMenuDetail";

function MenuItem(props) {
  const [isShow, setShow] = useState(false);

  const { menuInfo } = props;
  const [menu, setMenu] = useState(menuInfo);

  const handleChangeShow = () => {
    setShow(true);
  };

  return (
    <li className="menu-item">
      {isShow ? (
        <ModalMenuDetail
          open={isShow}
          menu_idx={menu.menu_idx}
          key={menu.menu_idx}
          setOpen={() => setShow(false)}
        />
      ) : (
        <></>
      )}
      <a href="javascript:void(0)" onClick={handleChangeShow}>
        <div className="brand-logo-wrap flex-container flex-nowrap">
          <img
            src={`${process.env.PUBLIC_URL}/images/brand-logo/${menu.brand_nm_en}.png`}
          />
        </div>
        <div className="menu-image-wrap">
          {/*<img src={menu.menu_img_url} />*/}
          <img src={`${process.env.PUBLIC_URL}/images/menu-info/62.jpeg`} />
        </div>
        <h3 className="menu-name">{menu.menu_nm_ko}</h3>
        <div className="menu-icon-wrap flex-container flex-wrap justify-sb">
          <p className="caffeine-wrap">
            {menu.menu_has_caffeine ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/menu-info/caffeine_1.png`}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/images/menu-info/no-caffeine.png`}
              />
            )}
          </p>
          <p className="star-rating-wrap flex-container">
            <span>
              <img
                src={`${process.env.PUBLIC_URL}/images/menu-info/star.png`}
              />
            </span>
            <span>{menu.menu_star_rating}</span>
          </p>
          <p className="heart-rating-wrap flex-container">
            {menu.is_clicked_heart ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/menu-info/heart.png`}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/images/menu-info/empty_heart.png`}
              />
            )}
          </p>
        </div>
      </a>
    </li>
  );
}

export default MenuItem;
