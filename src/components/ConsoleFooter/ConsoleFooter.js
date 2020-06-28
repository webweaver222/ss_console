import React from 'react';
import { connect } from 'react-redux';


import './ConsoleFooter.sass';
import Format from '../partials/format'

const ConsoleFooter = ({onSend, onFormat}) => (
  <div className="console-footer">
    <button onClick={onSend}>Send</button>
    <a href="https://github.com/webweaver222/" target="_blank">@MyGithub</a>
    <div className="fromat-wrapper">
      <Format/>
      <span>Format</span>
    </div>
  </div>
);


const mapStateToProps = state => ({
  // blabla: state.blabla,
});


export default connect(
  mapStateToProps,
  null,
)(ConsoleFooter);
