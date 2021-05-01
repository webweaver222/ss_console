import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "../../utils";

import { app_mount } from "../../actions/index";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import withService from "../hoc/withService";

import "./app.sass";

import Console from "../console";
import Preloader from "../preloader";

const App = ({ onMount, fetching, onMouseUp, onAppClick }) => {
  const [style, setStyle] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    //onMount();
  }, []);

  const content = !fetching ? (
    <Switch>
      <Route path="/" exact component={Console} />
    </Switch>
  ) : (
    <Preloader height={200} width={200} color="LightBlue" />
  );

  return (
    <div
      className="app"
      onMouseUp={onMouseUp}
      onClick={onAppClick}
      style={style}
    >
      {content}
    </div>
  );
};

const mapDispatchToProps = (dispatch, { sendSayApi, cookies }) => {
  return {
    //onMount: () => dispatch(app_mount(sendSayApi)(cookies)),
    onMouseUp: () => dispatch("MOUSE_UP"),
    onAppClick: () => dispatch("CLOSE_DROPDOWN"),
  };
};

export default compose(
  withRouter,
  withCookies,
  withService,
  connect(({ auth: { session_key, fetching } }) => {
    return {
      session_key,
      fetching,
    };
  }, mapDispatchToProps)
)(App);
