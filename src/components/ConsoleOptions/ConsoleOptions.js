import React from "react";
import { connect } from "react-redux";
import "./ConsoleOptions.sass";

const ConsoleOptions = (props) => {
  return (
    <div className="ConsoleOptions">
      <div className="urlWrapper">
        <select name="" id="">
          <option value="POST">POST</option>
          <option value="GET">GET</option>
        </select>
        <input type="text" placeholder="Enter request URL..." />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleOptions);
