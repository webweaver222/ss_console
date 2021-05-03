import React, { useState } from "react";
import { connect } from "react-redux";

import "./ConsoleSwitch.sass";

const ConsoleSwitch = ({ clickToggle }) => {
  const [showBodyNotHeaders, toggleShow] = useState(true);

  /*const clickToggle = () => {
    return showBodyNotHeaders ? toggleShow(false) : toggleShow(true);
  };*/

  return (
    <div className="ConsoleSwitch">
      <div className="toggleWrapper">
        <span>Body</span>
        <div className="toggle" onClick={clickToggle}>
          <div
            className="ball"
            style={{
              transform: `translateX(${showBodyNotHeaders ? "0" : "100%"})`,
            }}
          ></div>
        </div>
        <span>Headers</span>
      </div>
    </div>
  );
};

export default connect(
  () => ({}),
  (dispatch) => ({
    clickToggle: () => dispatch("TOGGLE_REQUEST_TYPE"),
  })
)(ConsoleSwitch);
