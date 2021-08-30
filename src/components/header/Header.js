import React, { useEffect, useState } from "react";
import "./Header.css";
import ModalLogin from "../login/ModalLogin";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../../redux/reducers/user";
import axios from "axios";
import { Button } from "semantic-ui-react";

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
          <Link to="/">늘 마시던 걸로</Link>
        </h1>

        {isLogin ? (
          <Button className="btn-logout" onClick={logout}>
            <img
              src={`${process.env.PUBLIC_URL}/images/header/btn_logout.png`}
            />
          </Button>
        ) : (
          <ModalLogin />
        )}
      </div>
    </header>
  );
}

export default Header;
