import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";

function MenuList() {
  const menuListRedux = useSelector((state) => state.menuList.menuList);

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
