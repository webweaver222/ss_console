import React from "react";
import { connect } from "react-redux";
import "./ConsoleOptions.sass";

const ConsoleOptions = ({ url, onChangeUrl, method, onChangeMethod }) => {
  return (
    <div className="ConsoleOptions">
      <div className="urlWrapper">
        <select
          name=""
          id=""
          value={method}
          onChange={(e) => onChangeMethod(e.target.value)}
        >
          <option value="POST">POST</option>
          <option value="GET">GET</option>
        </select>
        <input
          type="text"
          placeholder="Enter request URL..."
          value={url}
          onChange={(e) => onChangeUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ ssconsole: { url, method } }) => ({
  url,
  method,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeUrl: (text) =>
    dispatch({ type: "CHANGE_REQUEST_URL", payload: text }),
  onChangeMethod: (val) =>
    dispatch({ type: "CHANGE_REQUEST_METHOD", payload: val }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleOptions);
