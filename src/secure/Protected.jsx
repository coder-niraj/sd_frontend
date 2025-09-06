import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Protected = (props) => {


    let location = useLocation()
    let login = localStorage.getItem("login")
    let currentLocation = location.pathname;

    if ((currentLocation == "/" && !login) || (currentLocation == "/login" && !login)) {
        return (
            <>
                {props.children}
            </>
        )
    } else if ((currentLocation == "/" && login) || (currentLocation == "/login" && login)) {

        return (
            <>
                <Navigate to={"/Home"} />
            </>
        )
    }
    else {
        return (
            <>

                {login ? props.children : <Navigate to={"/login"} />}

            </>
        )
    }



}

export default Protected