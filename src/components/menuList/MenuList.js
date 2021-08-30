import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import axios from "axios";
import { actionCreators as menuActions } from "../../redux/reducers/menuList";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";

function MenuList() {
  const dispatch = useDispatch();
  const menuListRedux = useSelector((state) => state.menuList.menuList);

  const [isLoading, setLoading] = useState(true);

  const isLogin = useSelector((state) => state.user.isLogin);

  // useEffect(() => {
  //   let user_idx = "";
  //   if (localStorage.getItem("userInfo") !== null) {
  //     user_idx = JSON.parse(localStorage.getItem("userInfo")).user_idx;
  //   }
  //   axios({
  //     method: "POST",
  //     // url: "https://cafe-wiki-spring.herokuapp.com/menus",
  //     url: "http://localhost:8080/menus",
  //     data: {
  //       user_idx: user_idx,
  //       isLogin: isLogin,
  //     },
  //   }).then((res) => {
  //     dispatch(menuActions.setMenuList(res.data.resultData));
  //     // setTimeout(function () {
  //     setLoading(false);
  //     // }, 3000);
  //   });
  // }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <ul className="flex-container flex-wrap justify-fs">
      {menuListRedux == null ? (
        <></>
      ) : (
        menuListRedux.map((menu) => {
          return <MenuItem key={menu.menu_idx} menuInfo={menu} />;
        })
      )}
    </ul>
  );
}

export default MenuList;
