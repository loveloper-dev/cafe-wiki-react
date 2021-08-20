import React, { useState } from "react";
import MenuItem from "./MenuItem";

function MenuList() {
  const dummyList = [{}]; // dummy만들어두고 MenuItem 돌리기
  const [list, setList] = useState([]);

  return (
    <ul className="flex-container flex-wrap justify-fs">
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </ul>
  );
}

export default MenuList;
