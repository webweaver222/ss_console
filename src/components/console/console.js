import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { compose } from "../../utils";

import ConsoleHeader from '../console-header'
import ConsoleBody from '../ConsoleBody'

import { withCookies} from 'react-cookie';
import withService from "../hoc/withService";
import { logout} from '../../actions/index'

const Console = ({onExit}) => {

    const initSize = {
        width: '60%',
        height: '50%'
    }


    const [size, setSize] = useState(initSize)

    let resizeBtn = size.width !== initSize.width ? 'small': null

    const onResize = () => {
        if (size.width !== initSize.width) {
            return setSize(initSize)
        }
        
        setSize({
            width: '100%',
            height: '100%'
       })

    }
    

    return (  
        <div className="console" style={{width: size.width, height: size.height}}>
            <ConsoleHeader onExit = {onExit} onFscreen={onResize} resizeRender = {resizeBtn}/>
            <ConsoleBody />
        </div>
    )
}

const mapStateToProps = () => {

}


const mapDispatchToProps = (dispatch , {sendSayApi, cookies} ) => {
    return bindActionCreators({
        onExit:() => logout(sendSayApi)(cookies)
    }, dispatch)
}
 
export default compose(
    withService,
    withCookies,
    connect(null, mapDispatchToProps)
)(Console)