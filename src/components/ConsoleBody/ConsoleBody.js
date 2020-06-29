import React , {useEffect, useRef} from 'react';
import { connect } from 'react-redux';


import  './ConsoleBody.sass';
import DragRsz from '../partials/drag-element'
import {mouseMove} from '../../actions/index'

const ConsoleBody = ({onDragStart, onUpdate, boxStyle, onMouseMove, request, onRequestBodyChange , response, validationFail}) => {

const bodyRef = useRef(null)

useEffect(() => {
  onUpdate(bodyRef.current.offsetLeft)
}, [])


useEffect(() => {
  onUpdate(bodyRef.current.offsetLeft)
}, [boxStyle])

return (
  <div className="console-body" ref={bodyRef} onMouseMove={onMouseMove}>
    <div className="req-section" style={boxStyle}>
        <textarea value={request} onChange={(e) => onRequestBodyChange(e.target.value)}></textarea>
    </div>
    <div className="separator">
      <div className="drag-element" onMouseDown={onDragStart}>
        <DragRsz/>
        </div>
    </div>
    <div className="res-section">
      <textarea readOnly={true} value={response}></textarea></div>
  </div>
);
}


const mapStateToProps = ({ssconsole: {request, response, isDragging, boxStyle, validationFail}}) => ({
  isDragging, boxStyle, request, response, validationFail
});

const mapDispatchToProps = dispatch => ({
  onDragStart: () => dispatch('DRAG_START'),
  onUpdate: x => dispatch({type: 'CHANGE_OFFSET', payload: x}),
  onMouseMove: (e) => dispatch(mouseMove(e)),
  onRequestBodyChange: (body) => dispatch({type: 'CHANGE_REQUEST_BODY', payload: body})
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsoleBody);
