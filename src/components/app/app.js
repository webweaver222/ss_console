import React ,{useEffect} from 'react'
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

import './app.sass'
import LoginContainer from '../login'
import Console from '../console'


const App = ({session_key, history, getKey}) => {

    useEffect(() => {


        if (!session_key) {
            return history.push('/login')
        }
        return history.push('/')

    } , [])

    useEffect(() => {
        if (session_key) {
            return history.push('/')
        }
    }, [session_key])


 
    return (
        <div className="app">
            
            <Switch>
                <Route path="/login"  exact component={LoginContainer} />
                <Route path="/" exact component={Console}/>
            </Switch>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getKey: () => dispatch({type: 'add', payload: 'ddsasf'})
    }
}

export default withRouter(connect(({session_key}) => {
    return {
        session_key
    }
}, mapDispatchToProps)(App))
