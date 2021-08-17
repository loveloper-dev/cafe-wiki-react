import React from "react";
import "./Section.css";
import SearchBox from "../SearchBox/SearchBox";
import MenuList from "../menuList/MenuList";

function Section() {
  return (
    <section>
      <div className="container">
        <SearchBox></SearchBox>
        <MenuList></MenuList>
      </div>
    </section>
  );
}

export default Section;
