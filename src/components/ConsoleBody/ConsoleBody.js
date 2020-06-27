import React , {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import  './ConsoleBody.sass';
import DragRsz from '../partials/drag-element'

const ConsoleBody = (props) => {


const bodyRef = useRef(null)

const mouseDown = () => {
  return setIsDragging(true)
}
/*
document.addEventListener('mouseup', (e) => {
  return setIsDragging(false)
})

document.addEventListener('mousemove', (e) => {
  if (!isDragging) {
    return false;
  }

  let containerOffsetLeft = bodyRef.current.offsetLeft;
  console.log(isDragging);
  console.log(containerOffsetLeft);
})
*/



return (
  <div className="console-body" ref={bodyRef}>
    <div className="req-section">
        <textarea ></textarea>
    </div>
    <div className="separator">
      <div className="drag-element" onMouseDown={mouseDown}>
        <DragRsz/>
        </div>
    </div>
    <div className="res-section">
      <textarea readOnly={true}></textarea></div>
  </div>
);
}


const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsoleBody);
