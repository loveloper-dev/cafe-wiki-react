import React, { useEffect, useState } from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="ui page modals dimmer visible active loading-wrap">
      <div className="cup">
        <div className="logo-text">늘 마시던 걸로</div>
      </div>
    </div>
  );
}

export default Loading;
