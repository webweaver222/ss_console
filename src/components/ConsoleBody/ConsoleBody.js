import React , {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import {compose} from '../../utils'
import useDidMountEffect from '../customHooks/didMountEffect'



import withResizeEvents from '../hoc/withResizeEvents'
import  './ConsoleBody.sass';
import DragRsz from '../partials/drag-element'


const ConsoleBody = ({onDragStart, onUpdate, boxStyle, onMouseMove, request, onRequestBodyChange , response}) => {

const bodyRef = useRef(null)

useEffect(() => {
  onUpdate(bodyRef.current.offsetLeft)
}, [])


useDidMountEffect(() => {
  onUpdate(bodyRef.current.offsetLeft)
}, [boxStyle])

return (
  <div className="console-body" ref={bodyRef} onMouseMove={onMouseMove}>
        
          <div className="req-section" style={boxStyle}>
              <textarea value={request} onChange={(e) => onRequestBodyChange(e.target.value)}/>
          </div>
        

        <div className="separator">
           <div className="drag-element" onMouseDown={onDragStart}>
            <DragRsz/>
            </div>
        </div>

       
          <div className="res-section">
            <textarea readOnly={true} value={response}/>
          </div>
        </div>

);
}


const mapStateToProps = ({ssconsole: {request, response}}) => ({
  request, response
})

const mapDispatchToProps = dispatch => ({
  onRequestBodyChange: (body) => dispatch({type: 'CHANGE_REQUEST_BODY', payload: body})
});

export default compose(
  withResizeEvents,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(ConsoleBody)

