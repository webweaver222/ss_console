const initConsole = {
    request: '',
    response: '',
    isDragging: false,
    offset: null,
    boxStyle: {
     
    }
}

const updateConsole = ( state, action) => {

    if (typeof state === "undefined") {
        return  initConsole
      }

      const {ssconsole} = state

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
            boxStyle: action.payload
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
            response: action.payload
          }
        }

        default:
        return ssconsole

      }

}

export default updateConsole