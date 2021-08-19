import React from "react";
import "./Header.css";
import { ReactComponent as Login } from "./login-svg.svg";
import ModalLogin from "../login/ModalLogin";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { actions as userActions } from "../../redux/reducers/user";
import { useCookies } from "react-cookie";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies([""]);

  const logout = () => {
    localStorage.removeItem("userInfo");
    removeCookie("jwt");
    window.location.reload();
  };

  return (
    <header>
      <div className="container flex-container justify-sb">
        <h1 className="main-logo">늘 마시던 걸로</h1>

        {/*<div className="login-box">*/}

        {localStorage.getItem("userInfo") === null ? (
          <ModalLogin />
        ) : (
          <button onClick={logout}>로그아웃</button>
        )}

        {/*  /!*<img src={`${process.env.PUBLIC_URL}/images/header/login-svg.png`} />*!/*/}
        {/*</div>*/}
      </div>
      {/*<a href="javascript:void(0)">aa</a>*/}
    </header>
  );
}

export default Header;
