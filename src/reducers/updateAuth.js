const initialAuth = {
    session_key: undefined,
    login: '',
    password: '',
    fetching: false,
    login_fetching: false,
    auth_error: null,
    valid_errors: {}
  };
  
  const updateList = (list, newAdress, idx) => {
    if (list === null)
      return [
        {
          ...newAdress,
          id: 0,
        },
      ];
  
    if (newAdress === "remove") {
      return [...list.slice(0, idx), ...list.slice(idx + 1)];
    }
  
    if (typeof idx === "number") {
      return [...list.slice(0, idx), newAdress, ...list.slice(idx + 1)];
    }
  
    return [
      ...list,
      {
        id: Math.max(...list.map((p) => p.id), 0) + 1,
        ...newAdress,
      },
    ];
  };
  
  const upadteAuth = (state, action) => {
    if (typeof state === "undefined") {
      return initialAuth
    }
  
    const { auth } = state
  
    switch (action.type) {

        case 'APP_FETCH_START': {
          return {
            ...auth,
            fetching: true,
          }
        }
    
        case 'APP_FETCH_SUCCESS': {
         
            return {
                ...auth,
                session_key: action.payload.session,
                login: action.payload.email,
                fetching:  false
            }
        }

        case 'CHANGE_LOGIN_INPUT' : {
          return {
            ...auth,
            login: action.payload
          }
        }

        case 'CHANGE_PASS_INPUT' : {
          return {
            ...auth,
            password: action.payload
          }
        }

        case 'AUTH_FETCH_START': {
          return {
            ...auth,
            login_fetching: true,
            valid_errors: {},
          }
        }

        case 'AUTH_FETCH_SUCCESS': {
          return {
            ...auth,
            login_fetching: false,
            session_key: action.payload
            
          }
        }

        case 'AUTH_FETCH_FAIL': {
          return {
            ...auth,
            login_fetching: false,
            auth_error: action.payload
          }
        }

        case 'VALIDATION_FAIL' : {
            return {
                ...auth, 
                valid_errors: action.payload
            }
        }

        case 'LOGOUT': {
           return initialAuth
        }

  
      default:
        return auth;
    }
  };
  
  export default upadteAuth;
  