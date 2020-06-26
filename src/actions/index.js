import v from '../services/validator'


const enter = (sendsayApi) => async (dispatch, getState) => {
   const {login, password} = getState()

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
   console.log(resBody.session);
   dispatch({type:'AUTH_FETCH_SUCCESS', payload: resBody.session})
}

export {
    enter
}