import React, { useState } from "react";
import { connect } from "react-redux";

import "./ConsoleSwitch.sass";

const ConsoleSwitch = ({ clickToggle, requestType }) => {
  return (
    <div className="ConsoleSwitch">
      <div className="toggleWrapper">
        <span>Body</span>
        <div className="toggle" onClick={clickToggle}>
          <div
            className="ball"
            style={{
              transform: `translateX(${requestType === "body" ? "0" : "100%"})`,
            }}
          ></div>
        </div>
        <span>Headers</span>
      </div>
    </div>
  );
};

export default connect(
  ({ ssconsole: { requestType } }) => ({ requestType }),
  (dispatch) => ({
    clickToggle: () => dispatch("TOGGLE_REQUEST_TYPE"),
  })
)(ConsoleSwitch);
