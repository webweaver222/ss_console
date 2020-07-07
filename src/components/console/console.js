import React, {  useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { compose } from "../../utils";

import ConsoleHeader from '../console-header'
import ConsoleHistory from '../ConsoleHistory'
import ConsoleBody from '../ConsoleBody'
import ConsoleFooter from '../ConsoleFooter'

import { withCookies} from 'react-cookie';
import withService from "../hoc/withService";
import { logout, sendRequest, formatRequest} from '../../actions/index'


const Console = ({onExit, onSendRequest, onFormatRequest, onResizeConsole}) => {

    const initSize = {
        width: '60%',
        height: '60%'
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

       onResizeConsole()

    }
    

    return (  
        <div className="console" style={{width: size.width, height: size.height}}>
            <ConsoleHeader onExit = {onExit} onFscreen={onResize} resizeRender = {resizeBtn}/>
            <ConsoleHistory/>
            <ConsoleBody />
            <ConsoleFooter onSend={onSendRequest} onFormat={onFormatRequest}/>
        </div>
    )
}



const mapDispatchToProps = (dispatch , {sendSayApi, cookies} ) => {
    return bindActionCreators({
        onExit: () => logout(sendSayApi)(cookies),
        onSendRequest: () => sendRequest(sendSayApi),
        onFormatRequest: () => formatRequest,
        onResizeConsole:() => dispatch('RESIZE_CONSOLE')
    }, dispatch)
}
 
export default compose(
    withService,
    withCookies,
    connect(null, mapDispatchToProps)
)(Console)