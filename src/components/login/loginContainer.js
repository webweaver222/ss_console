import React, { Component } from "react";
import { connect } from "react-redux";

import { enter } from "../../actions/index";
import withService from "../hoc/withService";
import { compose } from "../../utils";
import Login from "./login";
import SadFace from "./sadface";

import "./login.sass";

const LoginContainer = ({
  login,
  password,
  changeLog,
  changePass,
  onEnter
}) => {
  const render = (preloader = null, error = null, valid_errors = {}) => {
    let buttonText = "Enter";
    
    if (preloader) {
      buttonText = preloader;
    }

    const errorBlock = error ? (
      <div className="errorBlock">
        <SadFace />
        <div className="message">
          <h2>Enter failed</h2>
          <span>{error}</span>
        </div>
      </div>
    ) : null;

    return (
      <React.Fragment>
        <h2>API-Console</h2>
        {errorBlock}
        <div className="log">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            className = {valid_errors.hasOwnProperty('login')? 'input-error': ''}
            name="login"
            value={login}
            onChange={e => changeLog(e.target.value)}
          />
        </div>
        <div className="pass">
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            className={valid_errors.hasOwnProperty('password')? 'input-error': null}
            name="pass"
            value={password}
            onChange={e => changePass(e.target.value)}
          />
        </div>
        <button onClick={onEnter}>{buttonText}</button>
      </React.Fragment>
    );
  };

  return <Login render={render} />;
};

const mapDispatchToProps = (dispatch, { sendSayApi }) => {
  return {
    changeLog: text => dispatch({ type: "CHANGE_LOGIN_INPUT", payload: text }),
    changePass: pass => dispatch({ type: "CHANGE_PASS_INPUT", payload: pass }),
    onEnter: () => dispatch(enter(sendSayApi))
  };
};

export default compose(
  withService,
  connect(({ login, password }) => {
    return {
      login, 
      password
    };
  }, mapDispatchToProps)
)(LoginContainer);
