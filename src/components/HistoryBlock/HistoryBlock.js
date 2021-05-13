import React, { useRef } from "react";

import { connect } from "react-redux";
import "./HistoryBlock.sass";
import DragElement from "../partials/drag-element";
import { copyRequest, send } from "../../actions/index";
import withService from "../hoc/withService";

const HistoryBlock = ({
  item,
  dropdown,
  showDD,
  scrollDelta,
  onResend,
  onCopy,
  onDelete,
  copied,
  onBlockClick,
}) => {
  const historyBlock = useRef(null);

  const dropdownMenu = dropdown === item.id && (
    <ul
      className="dropdown"
      style={{
        top: historyBlock.current.offsetTop + 40,
        left: historyBlock.current.offsetLeft - scrollDelta,
        width: historyBlock.current.clientWidth,
      }}
    >
      <li onClick={() => onResend(item.id)}>Resend</li>
      <li
        onClick={(e) => {
          e.stopPropagation();
          onCopy(item.id);
        }}
      >
        Copy
      </li>
      <li
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
      >
        Delete
      </li>
    </ul>
  );

  const requestDetails = (
    <>
      <div className="domain">{item.domain}</div>
      <div className="path">{item.path}</div>
    </>
  );

  return (
    <div
      className="history-block"
      ref={historyBlock}
      onClick={() => onBlockClick(item.id)}
    >
      <div
        className="indicator"
        style={{ backgroundColor: !item.success && "#CF2C00" }}
      ></div>
      <span
        style={copied && dropdown === item.id ? { color: "#0055FB" } : null}
        className="requestDetails"
      >
        {copied && dropdown === item.id ? "Сopied!" : requestDetails}
      </span>

      <span className="method" style={{ color: !item.success && "#CF2C00" }}>
        {item.method}
      </span>

      <div
        className="options"
        onClick={(e) => {
          e.stopPropagation();
          showDD(item.id);
        }}
      >
        <DragElement />
      </div>

      {dropdownMenu}
    </div>
  );
};

const mapStateToProps = ({ ssconsole: { dropdown, scrollDelta, copied } }) => ({
  dropdown,
  scrollDelta,
  copied,
});

const mapDispatchToProps = (dispatch, { sendSayApi }) => ({
  showDD: (id) =>
    dispatch({
      type: "SHOW_DROPDOWN",
      payload: id,
    }),
  onResend: (id) => dispatch(send(sendSayApi)(id)),
  onDelete: (id) => dispatch({ type: "DELETE_REQ", payload: id }),
  onCopy: (id) => dispatch(copyRequest(id)),
  onBlockClick: (id) => dispatch({ type: "HISTORY_BLOCK_SELECT", payload: id }),
});

export default withService(
  connect(mapStateToProps, mapDispatchToProps)(HistoryBlock)
);
