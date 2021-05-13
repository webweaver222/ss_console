import { validateJSON, destrUrlString, isUnique } from "../services/helpers";

const send = (api) => (request_id) => async (dispatch, getState) => {
  let {
    ssconsole: { request: body, url, headers, method, history },
  } = getState();

  if (request_id) {
    // if we take req from history
    const itemIdx = history.findIndex((item) => item.id === request_id);
    const historyItem = history[itemIdx];

    body = historyItem.request;
    headers = historyItem.headers;
    url = historyItem.title;
    method = historyItem.method;
  }

  const bodyObject = validateJSON(body);
  const headersObject = validateJSON(headers);

  if (!headersObject || !bodyObject) return dispatch("CONSOLE_VALID_FAIL");

  const request = api.prepareRequest(method, url);

  try {
    const res = await request(headersObject, bodyObject);

    dispatch({
      type: "CONSOLE_FETCH_SUCCESS",
      payload: JSON.stringify(await res.json(), undefined, 2),
    });

    if (isUnique(history, url, headers, body, method)) {
      const [domain, path] = destrUrlString(url);
      dispatch({
        type: "UNIQUE_REQUEST",
        payload: {
          request: body,
          headers,
          title: url,
          domain,
          path,
          method,
          success: res.ok,
        },
      });
    }
  } catch (e) {
    console.log(e, "send error11");
  }
};

const formatRequest = (dispatch, getState) => {
  const {
    ssconsole: { request, headers },
  } = getState();

  const requestObject = validateJSON(request);
  const headersObject = validateJSON(headers);

  if (!requestObject || !headersObject) {
    return dispatch("CONSOLE_VALID_FAIL");
  }

  const formattedReq = JSON.stringify(requestObject, undefined, 2);
  const formattedHeaders = JSON.stringify(headersObject, undefined, 2);

  dispatch({
    type: "FORMAT_REQEST",
    payload: {
      formattedReq,
      formattedHeaders,
    },
  });
};

const mouseMove = (e) => (dispatch, getState) => {
  const {
    mouseEvents: { isDragging, offset },
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
      flexGrow: "0",
    },
  });
};

const copyRequest = (id) => (dispatch, getState) => {
  const {
    ssconsole: { history },
  } = getState();

  const idx = history.findIndex((item) => item.id === id);

  const { method, headers, request, title } = history[idx];

  console.log(history[idx]);

  dispatch("COPIED");

  dispatch({ type: "CHANGE_REQUEST_METHOD", payload: method });
  dispatch({ type: "CHANGE_REQUEST_HEADERS", payload: headers });
  dispatch({ type: "CHANGE_REQUEST_BODY", payload: request });
  dispatch({ type: "CHANGE_REQUEST_URL", payload: title });
};

export { mouseMove, formatRequest, copyRequest, send };
