import React from "react";
import "./Section.css";
import SearchBox from "../SearchBox/SearchBox";
import MenuList from "../menuList/MenuList";
import { Route } from "react-router-dom";
import Join from "../join/Join";

const list = () => {
  return (
    <>
      <SearchBox></SearchBox>
      <MenuList></MenuList>
    </>
  );
};

function Section() {
  return (
    <section>
      <div className="container">
        <Route path="/" exact={true} component={list} />
        <Route path="/join" component={Join} />
      </div>
    </section>
  );
}

export default Section;
