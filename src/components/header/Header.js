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

  const isLogin = useSelector((state) => state.user.isLogin);

  const logout = () => {
    localStorage.removeItem("userInfo");
    removeCookie("jwt");
    dispatch(userAction.setLogin(false));
  };

  return (
    <header>
      <div className="container flex-container justify-sb">
        <h1 className="main-logo">
          <Link to="/">logo</Link>
        </h1>

        {isLogin ? (
          <button className="btn" onClick={logout}>
            로그아웃
          </button>
        ) : (
          <ModalLogin />
        )}
      </div>
    </header>
  );
}

export default Header;
