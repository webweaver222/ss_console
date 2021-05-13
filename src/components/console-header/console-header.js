import React from "react";
import { connect } from "react-redux";

import "./console-header.sass";

import Logo from "../partials/logo";
import ExitBtn from "../partials/exit";
import Fscreen from "../partials/fscreen";
import Sscreen from "../partials/sscreen";

const ConsoleHeader = ({ onExit, onFscreen, resizeRender, login }) => {
  const resize = resizeRender ? <Sscreen /> : <Fscreen />;

  return (
    <div className="console-header">
      <div className="left">
        <Logo />
        <h2>Api-console</h2>
      </div>
      <div className="right">
        <div className="exitBtn" onClick={onExit}>
          <ExitBtn />
        </div>
        <div className="fscreenBtn" onClick={onFscreen}>
          {resize}
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ auth: { login } }) => ({ login }),
  null
)(ConsoleHeader);
