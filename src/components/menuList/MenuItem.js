import React from "react";
import "./MenuItem.css";
// import * as imageList from "public/images/brand-logo";

function MenuItem(props) {
  // const { brandName = "hollys" } = props; // hollys는 default값
  const { brandName = "starbucks" } = props; // hollys는 default값
  // const { brandName = "hollys_1" } = props; // hollys는 default값
  return (
    <li className="menu-item">
      <a href="javascript:void(0)">
        <div className="brand-logo-wrap flex-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/brand-logo/${brandName}.png`}
          />
        </div>
        <div className="menu-image-wrap">
          <img
            src={`${process.env.PUBLIC_URL}/images/menus/${brandName}/[110563]_20210426095937947.jpg`}
          />
        </div>
        <h3 className="menu-name">JMT 콜드 브루</h3>
        <div className="menu-icon-wrap flex-container justify-sb">
          <p className="caffeine-wrap">
            <img
              src={`${process.env.PUBLIC_URL}/images/menu-info/caffeine_1.png`}
            />
            {/*<img*/}
            {/*  src={`${process.env.PUBLIC_URL}/images/menu-info/no-caffeine.png`}*/}
            {/*/>*/}
          </p>
          <p className="star-rating-wrap flex-container">
            <span>
              <img
                src={`${process.env.PUBLIC_URL}/images/menu-info/star.png`}
              />
            </span>
            <span>4.9</span>
          </p>
          <p className="heart-rating-wrap flex-container">
            <img src={`${process.env.PUBLIC_URL}/images/menu-info/heart.png`} />
          </p>
        </div>
      </a>
    </li>
  );
}

export default MenuItem;
