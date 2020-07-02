import v from "../services/validator";

const try_auth = sendsayApi => cookies => async (dispatch, getState) => {
  const {
    auth: { login, password }
  } = getState();

  const reqData = {
    action: "login",
    login: login,
    sublogin: null,
    passwd: password
  };

  v.validateEnter(reqData);

  if (Object.keys(v.errors).length > 0) {
    return dispatch({ type: "VALIDATION_FAIL", payload: v.errors });
  }

  dispatch({ type: "AUTH_FETCH_START" });
  const res = await sendsayApi.authentication(reqData);
  const resBody = await res.json();
  
  if (!resBody.session) {
    return dispatch({
      type: "AUTH_FETCH_FAIL",
      payload: JSON.stringify(resBody.errors[0])
    });
  }
  cookies.set("session_key", resBody.session, { path: "/" });
  dispatch({ type: "AUTH_FETCH_SUCCESS", payload: resBody.session });
};


const app_mount = sendsayApi => cookies => async dispatch => {
  console.log('1');
  dispatch("APP_FETCH_START");
  const session = cookies.get("session_key");

  if (session) {
    
    const res = await sendsayApi.re_auth(session);
    const resBody = await res.json();
    if (resBody.list['about.owner.email']) {
     
      return dispatch({ type: "APP_FETCH_SUCCESS", payload: {
        session,
        email: resBody.list['about.owner.email']
      } });
    }
  }

  dispatch({ type: "APP_FETCH_SUCCESS", payload: { session: null} });
};



const sendRequest = sendsayApi => async (dispatch, getState) => {
  const {
    auth: { session_key },
    ssconsole: { request, history }
  } = getState();

  // check if json syntax valid

  const requestObject = v.validateJSON(request);

  if (!requestObject) {
    return dispatch("CONSOLE_VALID_FAIL");
  }

  const res = await sendsayApi.sendRequest({
    session: session_key,
    ...requestObject
  });

  const resBody = await res.json();

  dispatch({
    type: "CONSOLE_FETCH_SUCCESS",
    payload: JSON.stringify(resBody, undefined, 2)
  });

  

  const reqJSON = JSON.stringify(requestObject, undefined, 2);

  if (history.findIndex(item => item.request === reqJSON) === -1) {
    
    dispatch({
      type: "UNIQUE_REQUEST",
      payload: {
        request: reqJSON,
        title: requestObject.action? requestObject.action: 'no-action',
        success: !resBody.errors ? true : false
      }
    });
  }
};


const formatRequest = (dispatch, getState) => {
  const {
    ssconsole: { request }
  } = getState();

  if (request === '') return null

  const requestObject = v.validateJSON(request)

  if (!requestObject) {
    return dispatch('CONSOLE_VALID_FAIL')
  }

  const formattedString = JSON.stringify(requestObject, undefined, 2);
  dispatch({type: 'FORMAT_REQEST', payload: formattedString})
}



const logout = sendsayApi => cookies => async dispatch => {
  const session = cookies.get("session_key");
  await sendsayApi.logout(session);
  cookies.remove("session_key");
  dispatch("LOGOUT");
};



const mouseMove = e => (dispatch, getState) => {
  const {
    ssconsole: { isDragging, offset }
  } = getState();

  if (!isDragging) {
    return false;
  }

  let pointerRelativeXpos = e.clientX - offset;

  const boxAminWidth = 60;

  dispatch({
    type: "CHANGE_BOX_STYLE",
    payload: {
      width: Math.max(boxAminWidth, pointerRelativeXpos - 24) + "px",
      flexGrow: "0"
    }
  });
};

export { try_auth, app_mount, logout, mouseMove, sendRequest, formatRequest };
