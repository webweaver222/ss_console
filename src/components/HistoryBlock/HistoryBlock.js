import React, {useRef} from 'react';

import { connect } from 'react-redux';
import './HistoryBlock.sass';
import DragElement from '../partials/drag-element'
import {copyRequest, reSend} from '../../actions/index'
import withService from "../hoc/withService";


const HistoryBlock = ({item, dropdown, showDD, scrollDelta, onResend, onCopy, onDelete, copied, onBlockClick}) => {

  const historyBlock = useRef(null)

  const dropdownMenu = dropdown === item.id ?
    <ul className="dropdown"  style={{
      top: historyBlock.current.offsetTop + 40, 
      left: historyBlock.current.offsetLeft - scrollDelta,
      width: historyBlock.current.clientWidth
      }}>
      <li onClick={() => onResend(item.request, item.id)}>Resend</li>
      <li onClick={(e) => {
        e.stopPropagation()
        onCopy(item.id)
        }}>Copy</li>
      <li onClick={(e) => {
         e.stopPropagation()
        onDelete(item.id)}}>Delete</li>
  </ul> : null

  return (
    <div className="history-block" ref={historyBlock} onClick={() => onBlockClick(item.id)}>
            <div
              className="indicator"
              style={item.success ? null : { backgroundColor: "#CF2C00" }}
            ></div>
            <span style={copied && dropdown === item.id? {color: '#0055FB'} : null}>{copied && dropdown === item.id? 'Сopied!' : item.title}</span>

            <div className="options" onClick={(e) => {
              e.stopPropagation()
              showDD(item.id)
              }}>
              <DragElement />
            </div>

            {dropdownMenu}
            
          </div>
  )
}



const mapStateToProps = ({ssconsole: {dropdown, scrollDelta, copied}}) => ({
  dropdown, scrollDelta, copied
});

const mapDispatchToProps = (dispatch, {sendSayApi}) => ({
   showDD: (id) => dispatch({
    type: 'SHOW_DROPDOWN',
    payload: id
  }),
  onResend: (request, id) => dispatch(reSend(sendSayApi)(request)(id)),
  onDelete: (id) => dispatch({type: 'DELETE_REQ', payload: id}),
  onCopy: (id) => dispatch(copyRequest(id)),
  onBlockClick: (id) => dispatch({type: 'HISTORY_BLOCK_SELECT', payload: id})
});

export default withService(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryBlock))
