import React from "react";

import "./console-header.sass";

import Logo from "../partials/logo";
import Fscreen from "../partials/fscreen";
import Sscreen from "../partials/sscreen";

const ConsoleHeader = ({ onFscreen, resizeRender }) => {
  const resize = resizeRender ? <Sscreen /> : <Fscreen />;

  return (
    <div className="console-header">
      <div className="left">
        <Logo />
        <h2>Api-console</h2>
      </div>
      <div className="right">
        <div className="fscreenBtn" onClick={onFscreen}>
          {resize}
        </div>
      </div>
    </div>
  );
};

export default ConsoleHeader;
