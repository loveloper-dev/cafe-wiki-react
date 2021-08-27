import React, { useState } from "react";
import "./Header.css";
import ModalLogin from "../login/ModalLogin";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../../redux/reducers/user";

function Header() {
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies([""]);

  // const [isSignedIn, setIsSignedIn] = useState(
  //   localStorage.getItem("userInfo")
  // );

  const isLogin = useSelector((state) => state.user.isLogin);

  const logout = () => {
    localStorage.removeItem("userInfo");
    removeCookie("jwt");
    // setIsSignedIn(false);

    dispatch(userAction.setLogin(false));
    // window.location.reload();
  };

  return (
    <header>
      <div className="container flex-container justify-sb">
        <h1 className="main-logo">
          <Link to="/">logo</Link>
        </h1>

        {/*<div className="login-box">*/}

        {isLogin ? (
          <button className="btn" onClick={logout}>
            로그아웃
          </button>
        ) : (
          <ModalLogin />
        )}

        {/*  /!*<img src={`${process.env.PUBLIC_URL}/images/header/login-svg.png`} />*!/*/}
        {/*</div>*/}
      </div>
      {/*<a href="javascript:void(0)">aa</a>*/}
    </header>
  );
}

export default Header;
