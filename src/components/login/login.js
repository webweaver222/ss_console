import React, { Component } from 'react';
import { connect } from "react-redux";
import Preloader from '../preloader'


const Login = ({render, fetching, auth_error, valid_errors}) => {

  let preloader; 

   if (fetching) {
        preloader = <Preloader/>
   }



    return ( <div className="login">
       {render(preloader, auth_error, valid_errors)}
    </div> );
}
 
export default connect(({fetching, auth_error, valid_errors}) => {
    return {
        fetching,
        auth_error,
        valid_errors
    }
}, null)(Login)