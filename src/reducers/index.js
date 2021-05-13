import updateAuth from "./updateAuth";
import updateConsole from "./updateConsole";
import updateHistory from "./updateHistory";
import updateMouseEvents from "./updateMouseEvents";

const reducer = (state, action) => {
  return {
    auth: updateAuth(state, action),
    ssconsole: updateConsole(state, action),
    mouseEvents: updateMouseEvents(state, action),
  };
};

export default reducer;
