const initMouseEvents = {
  isDragging: false,
  //,
  boxStyle: {},
};

const updateMouseEvents = (state, action) => {
  if (typeof state === "undefined") return initMouseEvents;

  const { mouseEvents } = state;

  switch (action.type) {
    case "DRAG_START": {
      return {
        ...mouseEvents,
        isDragging: true,
      };
    }

    case "MOUSE_UP": {
      return {
        ...mouseEvents,
        isDragging: false,
      };
    }

    case "CHANGE_OFFSET": {
      return {
        ...mouseEvents,
        offset: action.payload,
      };
    }

    case "CHANGE_BOX_STYLE": {
      return {
        ...mouseEvents,
        boxStyle: {
          ...mouseEvents.boxStyle,
          ...action.payload,
        },
      };
    }

    default:
      return mouseEvents;
  }
};

export default updateMouseEvents;
