import { updateHistory } from "./helpers";

const initConsole = {
  request: '{"name" : "alex", "job" : "janitor"}',
  headers: '{"Accept": "*/*", "Content-Type": "application/json"}',
  response: "",
  url: "https://reqres.in/api/users",
  method: "GET",
  history: [],
  dropdown: null,
  copied: false,
  validationFail: false,
  scrollDelta: 0,
  requestType: "body",
};

const updateConsole = (state, action) => {
  if (typeof state === "undefined") {
    return initConsole;
  }

  const {
    ssconsole,
    ssconsole: { boxStyle, history, copied, requestType },
  } = state;

  switch (action.type) {
    case "CHANGE_REQUEST_METHOD": {
      return {
        ...ssconsole,
        method: action.payload,
      };
    }

    case "TOGGLE_REQUEST_TYPE": {
      return {
        ...ssconsole,
        requestType:
          requestType === initConsole.requestType ? "headers" : "body",
      };
    }

    case "CHANGE_REQUEST_HEADERS": {
      return {
        ...ssconsole,
        headers: action.payload,
      };
    }

    case "CHANGE_REQUEST_URL": {
      return {
        ...ssconsole,
        url: action.payload,
      };
    }

    case "CHANGE_REQUEST_BODY": {
      return {
        ...ssconsole,
        request: action.payload,
      };
    }

    case "CONSOLE_FETCH_SUCCESS": {
      return {
        ...ssconsole,
        response: action.payload,
        boxStyle: {
          ...boxStyle,
          border: "1px solid rgba(0, 0, 0, 0.2)",
          boxShadow: "none",
        },
      };
    }

    case "CONSOLE_VALID_FAIL": {
      return {
        ...ssconsole,
        boxStyle: {
          ...boxStyle,
          boxShadow: "0px 0px 5px rgba(207, 44, 0, 0.5)",
          border: "1px solid #CF2C00",
        },
      };
    }

    case "FORMAT_REQEST": {
      return {
        ...ssconsole,
        request: action.payload.formattedReq,
        headers: action.payload.formattedHeaders,
        validationFail: false,
      };
    }

    case "UNIQUE_REQUEST": {
      return {
        ...ssconsole,
        history: updateHistory(history, action.payload),
      };
    }

    case "HISTORY_MOUNT": {
      return {
        ...ssconsole,
        history: action.payload,
      };
    }

    case "HISTORY_CLEAR": {
      return {
        ...ssconsole,
        history: initConsole.history,
      };
    }

    case "DELETE_REQ": {
      const idx = history.findIndex((item) => item.id === action.payload);

      return {
        ...ssconsole,
        history: updateHistory(history, "remove", idx),
      };
    }

    case "SHOW_DROPDOWN": {
      return {
        ...ssconsole,
        dropdown: action.payload,
      };
    }

    case "SCROLL_HISTORY": {
      return {
        ...ssconsole,
        dropdown: null,
        scrollDelta: action.payload,
      };
    }

    case "CLOSE_DROPDOWN": {
      return {
        ...ssconsole,
        dropdown: null,
        copied: initConsole.copied,
      };
    }

    case "RESIZE_CONSOLE": {
      return {
        ...ssconsole,
        dropdown: null,
        scrollDelta: 0,
        boxStyle: {
          flex: "1 1 auto",
          flexGrow: "auto",
        },
      };
    }

    case "COPIED": {
      return {
        ...ssconsole,
        copied: !copied,
      };
    }

    default:
      return ssconsole;
  }
};

export default updateConsole;
