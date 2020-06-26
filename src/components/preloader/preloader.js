import React from 'react'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Preloader = () => {
    return (
        <div className="preloader">
            <Loader
         type="TailSpin"
         color="#fff"
         height={20}
         width={20}
         //timeout={3000} //3 secs
      />
        </div>
    )
}

export default Preloader