import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "../../utils";

import ConsoleHeader from "../console-header";
import ConsoleOptions from "../ConsoleOptions";
import ConsoleHistory from "../ConsoleHistory";
import ConsoleSwitch from "../ConsoleSwitch";
import ConsoleBody from "../ConsoleBody";
import ConsoleFooter from "../ConsoleFooter";

import { withCookies } from "react-cookie";
import withService from "../hoc/withService";
import { formatRequest, send } from "../../actions/index";

const Console = ({
  onExit,
  onSendRequest,
  onFormatRequest,
  onResizeConsole,
}) => {
  const [consoleSize, setSize] = useState({});

  let resizeBtn = Object.keys(consoleSize).length !== 0 && "small";

  const onResize = () => {
    if (Object.keys(consoleSize).length !== 0) {
      return setSize({});
    }

    setSize({
      maxWidth: "100%",
      width: "100%",
      height: "100%",
    });

    onResizeConsole();
  };

  return (
    <div className="console" style={consoleSize}>
      <ConsoleHeader
        onExit={onExit}
        onFscreen={onResize}
        resizeRender={resizeBtn}
      />
      <ConsoleOptions />
      <ConsoleHistory />
      <ConsoleSwitch />
      <ConsoleBody />
      <ConsoleFooter onSend={onSendRequest} onFormat={onFormatRequest} />
    </div>
  );
};

const mapDispatchToProps = (dispatch, { sendSayApi, cookies }) => {
  return bindActionCreators(
    {
      onExit: () => logout(sendSayApi)(cookies),
      onSendRequest: () => send(sendSayApi)(),
      onFormatRequest: () => formatRequest,
      onResizeConsole: () => dispatch("RESIZE_CONSOLE"),
    },
    dispatch
  );
};

export default compose(
  withService,
  withCookies,
  connect(null, mapDispatchToProps)
)(Console);
