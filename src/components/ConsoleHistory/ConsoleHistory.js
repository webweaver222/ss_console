import React, {useRef, useEffect} from 'react';

import { connect } from 'react-redux';
import './ConsoleHistory.sass';
import useDidMountEffect from '../customHooks/didMountEffect'

import Clear from '../partials/clear'
import HistoryBlock from '../HistoryBlock'

const ConsoleHistory = ({ history, onMount, clearHistory, onScrollHistory }) => {

  const list = useRef(null);

  const onScroll = e => {
    list.current.scrollLeft += e.deltaY * 0.3;
    onScrollHistory(list.current.scrollLeft)
  };

  useEffect(() => {
    
    if(localStorage.getItem('history')) {
      
    onMount(JSON.parse(localStorage.getItem('history') || "[]" ))
    }
  }, [])

  useDidMountEffect(() => {
      localStorage.setItem('history' , JSON.stringify(history))
  }, [history])

  const renderList = historyList => {
    return historyList.map((item) => {
      return (
        <HistoryBlock item={item} key={item.id} list={list}/>
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
  onScrollHistory: (delta) => dispatch({type: 'SCROLL_HISTORY', payload: delta})
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsoleHistory);
