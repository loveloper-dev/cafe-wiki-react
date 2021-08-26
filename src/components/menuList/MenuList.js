import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import axios from "axios";

function MenuList() {
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    // 모든 state나 state가 바뀔 때 마다 실행됨
    axios({
      method: "GET",
      // url: "https://cafe-wiki-spring.herokuapp.com/menus",
      url: "http://localhost:8080/menus",
      data: {},
      // responseType: "type",
    }).then((res) => {
      setMenuList(res.data);
    });
  }, []);

  return (
    <ul className="flex-container flex-wrap justify-fs">
      {menuList.map((menu) => {
        return <MenuItem key={menu.menu_idx} menuInfo={menu} />;
      })}
    </ul>
  );
}

export default MenuList;
