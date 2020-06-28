import v from '../services/validator'




const try_auth = (sendsayApi) => (cookies) => async (dispatch, getState) => {
   const {auth: {login, password}} = getState()

  

   const reqData = {
    action: 'login',
    login  : login,
    sublogin : null,
    passwd : password
   }

   v.validateEnter(reqData)

   if (Object.keys(v.errors).length > 0) {
       return dispatch({type:'VALIDATION_FAIL', payload: v.errors})
   }
   

   dispatch({type:'AUTH_FETCH_START'})
   const res = await sendsayApi.authentication(reqData)
   const resBody = await  res.json()
   if (!resBody.session) {
       return dispatch({type:'AUTH_FETCH_FAIL', payload: JSON.stringify(resBody.errors[0])})
   }
   cookies.set('session_key', resBody.session, { path: '/' });

   dispatch({type:'AUTH_FETCH_SUCCESS', payload: resBody.session})
}


const app_mount = (sendsayApi) => (cookies) => async (dispatch) => {
    dispatch('APP_FETCH_START')

    const session = cookies.get('session_key')

    if (session) {
        
        const res = await sendsayApi.try_pong(session)
        const resBody = await res.json()
      
        if (resBody.ping) {
            return dispatch({type: 'APP_FETCH_SUCCESS', payload: session})
        }
        
    }

    dispatch({type: 'APP_FETCH_SUCCESS', payload: null})
}


const sendRequest = (sendsayApi) => async (dispatch, getState) => {
    const {auth: {session_key}, ssconsole: {request}} = getState()

    // check if json syntax valid

    const obj = {
        session: session_key,
        ...JSON.parse(request)
    }
    
    const res = await sendsayApi.sendRequest(obj)
    const resBody = await res.json()

    dispatch({type: 'CONSOLE_FETCH_SUCCESS' , payload : JSON.stringify(resBody)})


}

const logout = (sendsayApi) => (cookies) => async (dispatch) => {

    const session = cookies.get('session_key')
    const logout = await sendsayApi.logout(session)
    console.log(await logout.json());
    cookies.remove('session_key')
    dispatch('LOGOUT')
}

const mouseMove = (e) => (dispatch , getState) => {
    const {ssconsole: {isDragging, offset}} = getState()

    if (!isDragging) {
        return false
    }

    let pointerRelativeXpos = e.clientX - offset

    const boxAminWidth = 60;

    dispatch({type: 'CHANGE_BOX_STYLE', payload: {
        width: (Math.max(boxAminWidth, pointerRelativeXpos - 24)) + 'px',
        flexGrow: '0'
    }})
}

export {
    try_auth,
    app_mount,
    logout,
    mouseMove,
    sendRequest
}