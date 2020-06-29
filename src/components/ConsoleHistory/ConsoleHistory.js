import React, {useRef} from 'react';

import { connect } from 'react-redux';
import './ConsoleHistory.sass';

import Clear from '../partials/clear'
import DragElement from '../partials/drag-element'

const ConsoleHistory = (props) => {

  const list = useRef(null)

  const onScroll = (e) => {
    list.current.scrollLeft += e.deltaY * 0.3
  }


  return (
  <div className="console-history">
    <div className="history-list-wrapper" onWheel={onScroll} ref={list}>
    <div className="history-list" >
   
    <div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div>



      <div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div><div className="history-block">
          <div className="indicator"></div>
          <span>track.get</span>
          <div className="options"><DragElement/></div>
      </div>
    
    </div>
    </div>
    <div className="history-clear"><Clear/></div>
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
)(ConsoleHistory);
