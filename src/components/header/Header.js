import React, { useEffect, useState } from "react";
import "./Header.css";
import ModalLogin from "../login/ModalLogin";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../../redux/reducers/user";
import axios from "axios";
import { actionCreators as menuActions } from "../../redux/reducers/menuList";

function Header() {
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies([""]);

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/allergies",
    }).then((res) => {
      const allergyMap = res.data.resultData.map((allergy) => {
        allergy.isDanger = false;
        return allergy;
      });
      localStorage.setItem("allergyInfo", JSON.stringify(allergyMap));
    });
  }, []);

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
