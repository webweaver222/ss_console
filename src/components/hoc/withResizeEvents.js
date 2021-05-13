import React from "react";
import { connect } from "react-redux";
import { mouseMove } from "../../actions/index";

const withResizeEvents = (Wrapped) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )((props) => <Wrapped {...props} />);

const mapStateToProps = ({ mouseEvents: { isDragging, boxStyle } }) => ({
  isDragging,
  boxStyle,
});

const mapDispatchToProps = (dispatch) => ({
  onDragStart: () => dispatch("DRAG_START"),
  onUpdate: (x) => dispatch({ type: "CHANGE_OFFSET", payload: x }),
  onMouseMove: (e) => dispatch(mouseMove(e)),
});

export default withResizeEvents;
