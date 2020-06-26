const initialState = {
    session_key: null,
    login: '',
    password: '',
    fetching: false,
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
  
  const reducer = (state, action) => {
    if (typeof state === "undefined") {
      return initialState;
    }
  
  
    switch (action.type) {
    
        case 'add': {
            return {
                ...state,
                session_key: action.payload
            }
        }

        case 'CHANGE_LOGIN_INPUT' : {
          return {
            ...state,
            login: action.payload
          }
        }

        case 'CHANGE_PASS_INPUT' : {
          return {
            ...state,
            password: action.payload
          }
        }

        case 'AUTH_FETCH_START': {
          return {
            ...state,
            fetching: true,
            valid_errors: null
          }
        }

        case 'AUTH_FETCH_SUCCESS': {
          return {
            ...state,
            fetching: false,
            session_key: action.payload
          }
        }

        case 'AUTH_FETCH_FAIL': {
          return {
            ...state,
            fetching: false,
            auth_error: action.payload
          }
        }

        case 'VALIDATION_FAIL' : {
            return {
                ...state, 
                valid_errors: action.payload
            }
        }

  
      default:
        return state;
    }
  };
  
  export default reducer;
  