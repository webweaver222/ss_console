import updateAuth from './updateAuth'
import updateConsole from './updateConsole'
  
  
  const reducer = (state, action) => {
    return {
        auth : updateAuth(state, action),
        ssconsole: updateConsole(state, action)
    }
  }
  

  export default reducer;
  