import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import axios from "axios";
import { actionCreators as menuActions } from "../../redux/reducers/menuList";
import { useDispatch, useSelector } from "react-redux";

function MenuList() {
  const dispatch = useDispatch();
  const menuListRedux = useSelector((state) => state.MenuList.menuList);

  useEffect(() => {
    axios({
      method: "GET",
      // url: "https://cafe-wiki-spring.herokuapp.com/menus",
      url: "http://localhost:8080/menus",
      data: {},
    }).then((res) => {
      dispatch(menuActions.setMenuList(res.data));
    });
  }, []);

  return (
    <ul className="flex-container flex-wrap justify-fs">
      {menuListRedux.map((menu) => {
        return <MenuItem key={menu.menu_idx} menuInfo={menu} />;
      })}
    </ul>
  );
}

export default MenuList;
