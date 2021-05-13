import React from "react";

import "./ConsoleFooter.sass";
import Format from "../partials/format";

const ConsoleFooter = ({ onSend, onFormat }) => (
  <div className="console-footer">
    <button onClick={onSend}>Send</button>
    <a href="https://github.com/webweaver222/" target="_blank">
      @MyGithub
    </a>
    <div className="fromat-wrapper" onClick={onFormat}>
      <Format />
      <span>Format</span>
    </div>
  </div>
);

export default ConsoleFooter;
