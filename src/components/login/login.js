import React from 'react';
import { connect } from "react-redux";


import Preloader from '../preloader'
import Logo from '../partials/logo'



const Login = ({render, login_fetching, auth_error, valid_errors}) => {

  let preloader; 

   if (login_fetching) {
        preloader = <Preloader/>
   }



    return ( <div className="login-wrapper">
        <Logo/>
        <div className="login">
            {render(preloader, auth_error, valid_errors)}
        </div> 
        </div>
   );
}
 
export default connect(({auth: {login_fetching, auth_error, valid_errors}}) => {
    return {
        login_fetching,
        auth_error,
        valid_errors
    }
}, null)(Login)