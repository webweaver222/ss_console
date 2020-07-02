const initConsole = {
    request: '',
    response: '',
    history: [],
    isDragging: false,
    validationFail: false,
    offset: null,
    boxStyle: {
     
    }
}

const updateHistory = (list, newItem, idx) => {
  if (list.length === 0)
    return [
      {
        id: 0, 
        ...newItem
      },
    ];

  if (newItem === "remove") {
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
  }

  /*if (typeof idx === "number") {
    return [...list.slice(0, idx), newAdress, ...list.slice(idx + 1)];
  }*/

  return [
    {
      id: Math.max(...list.map((p) => p.id), 0) + 1,
      ...newItem,
    },
    ...list
  ];
};

const updateConsole = ( state, action) => {

    if (typeof state === "undefined") {
        return  initConsole
      }

      const {ssconsole, ssconsole:{boxStyle , history}} = state

      switch (action.type) {

        case 'DRAG_START' : {
          return { 
           ...ssconsole,
           isDragging: true
          }
        }

        case 'MOUSE_UP': {
          return { 
            ...ssconsole,
            isDragging: false
           }
        }

        case 'CHANGE_OFFSET': {
          return {
            ...ssconsole,
            offset: action.payload
          }
        }

        case 'CHANGE_BOX_STYLE': {
          return {
            ...ssconsole,
            boxStyle: { 
              ...boxStyle,
              ...action.payload
            }
          }
        }

        case 'CHANGE_REQUEST_BODY': {
          return {
            ...ssconsole,
            request: action.payload
          }
        }

        case 'CONSOLE_FETCH_SUCCESS': {
          return {
            ...ssconsole,
            response: action.payload,
            boxStyle: {
              ...boxStyle,
              border: '1px solid rgba(0, 0, 0, 0.2)',
              boxShadow: 'none'
            }
          }
        }

        case 'CONSOLE_VALID_FAIL': {
          return {
            ...ssconsole,
            boxStyle: {
                ...boxStyle,
                boxShadow: '0px 0px 5px rgba(207, 44, 0, 0.5)',
                border: '1px solid #CF2C00'
            }
          }
        }

        case 'FORMAT_REQEST': {
          return {
            ...ssconsole,
            request: action.payload,
            validationFail: false
          }
        }

        case 'UNIQUE_REQUEST' : {
          return {
            ...ssconsole,
            history: updateHistory(history, action.payload)
          }
        }

        case 'HISTORY_MOUNT': {
          return {
            ...ssconsole,
            history: action.payload
          }
        }

        case 'HISTORY_CLEAR' : {
          return {
            ...ssconsole,
            history: initConsole.history 
          }
        }

        default:
        return ssconsole

      }

}

export default updateConsole