const initConsole = {

}

const updateConsole = ( state, action) => {

    if (typeof state === "undefined") {
        return  initConsole
      }

      const {ssconsole} = state

      switch (action.type) {

        default:
        return ssconsole

      }

}

export default updateConsole