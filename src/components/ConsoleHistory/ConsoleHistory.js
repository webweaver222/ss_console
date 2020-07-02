import React, {useRef, useEffect} from 'react';

import { connect } from 'react-redux';
import './ConsoleHistory.sass';
import useDidMountEffect from '../customHooks/didMountEffect'

import Clear from '../partials/clear'
import DragElement from '../partials/drag-element'

const ConsoleHistory = ({ history, onMount, clearHistory }) => {
  console.log(history);
  const list = useRef(null);

  const onScroll = e => {
    list.current.scrollLeft += e.deltaY * 0.3;
  };

  useEffect(() => {
    
    if(localStorage.getItem('history')) {
      
    onMount(JSON.parse(localStorage.getItem('history') || "[]" ))
    }
  }, [])

  useDidMountEffect(() => {
      localStorage.setItem('history' , JSON.stringify(history))
  }, [history])

  const renderList = list => {
    return list.map((item, idx) => {
      return (
        <div className="history-block" key={item.id}>
            <div
              className="indicator"
              style={item.success ? null : { backgroundColor: "#CF2C00" }}
            ></div>
            <span>{item.title}</span>
            <div className="options">
              <DragElement />
            </div>
         
            <ul className="dropdown">
           
                <li>Resend</li>
                <li>Copy</li>
                <li>Delete</li>
            </ul>
          </div>
      );
    });
  };

  return (
    <div className="console-history">
      <div className="history-list-wrapper" onWheel={onScroll} ref={list}>

        <div className="history-list">

          {renderList(history)}
        
        </div>
      </div>
      <div className="history-clear" onClick={clearHistory}>
        <Clear />
      </div>
    </div>
  );
};


const mapStateToProps = ({ssconsole: {history}}) => ({
    history
});

const mapDispatchToProps = dispatch => ({
  onMount: (history) => dispatch({type:'HISTORY_MOUNT' , payload: history}),
  clearHistory: () => dispatch('HISTORY_CLEAR'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsoleHistory);
