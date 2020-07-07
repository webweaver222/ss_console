import React ,{useEffect, useRef} from 'react'
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'
import { compose } from "../../utils";

import { app_mount} from '../../actions/index'
import { withCookies} from 'react-cookie';
import {withRouter} from 'react-router-dom';
import withService from "../hoc/withService";
import useDidMountEffect from '../customHooks/didMountEffect'

import './app.sass'

import LoginContainer from '../login'
import Console from '../console'
import Preloader from '../preloader'



const App = ({session_key, onMount,  fetching, onMouseUp, onAppClick}) => {

    useEffect(() => {
        onMount()
    } , [])

    useDidMountEffect(() => {
     

    }, [session_key])


    const content = !fetching? 
    <Switch>
            <Route path="/login"  exact component={LoginContainer} />
            <Route path="/" exact component={Console}/>
    </Switch> : <Preloader height = {200} width = {200} color='LightBlue'/>

   
 
    return (
        <div className="app" onMouseUp={onMouseUp} onClick={onAppClick}>
            {content}
        </div>
    )
}

const mapDispatchToProps = (dispatch, {sendSayApi, cookies }) => {
    return {
        onMount: () => dispatch(app_mount(sendSayApi)(cookies)),
        onMouseUp: () => dispatch('MOUSE_UP'),
        onAppClick: () => dispatch('CLOSE_DROPDOWN')
    }
}



export default compose(
    withRouter,
    withCookies,
    withService,
    connect(({auth: {session_key, fetching}}) => {
        return {
            session_key,
            fetching
        }
    }, mapDispatchToProps)
)(App)
