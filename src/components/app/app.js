import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";

import { getHistory } from "../../actions";

import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import withService from "../hoc/withService";

import "./app.sass";

import Console from "../console";

const App = ({ onMouseUp, onAppClick, onMount }) => {
  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="app" onMouseUp={onMouseUp} onClick={onAppClick}>
      <Console />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMouseUp: () => dispatch("MOUSE_UP"),
    onAppClick: () => dispatch("CLOSE_DROPDOWN"),
    onMount: () => dispatch(getHistory()),
  };
};

export default compose(
  withRouter,
  withCookies,
  withService,
  connect(null, mapDispatchToProps)
)(App);
