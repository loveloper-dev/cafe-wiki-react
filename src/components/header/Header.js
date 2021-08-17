import React from "react";
import "./Header.css";
import { ReactComponent as Login } from "./login-svg.svg";
import ModalLogin from "../login/ModalLogin";

function Header() {
  return (
    <header>
      <div className="container flex-container justify-sb">
        <h1 className="main-logo">늘 마시던 걸로</h1>

        {/*<div className="login-box">*/}
        <ModalLogin />
        {/*  /!*<img src={`${process.env.PUBLIC_URL}/images/header/login-svg.png`} />*!/*/}
        {/*</div>*/}
      </div>
      {/*<a href="javascript:void(0)">aa</a>*/}
    </header>
  );
}

export default Header;
