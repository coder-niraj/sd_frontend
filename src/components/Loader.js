import React from 'react';
import { PulseLoader } from 'react-spinners'
const Loader = ({ color }) => {
    return (
        <>

            <PulseLoader color={color || "#fff"} />
        </>
    );
};

export default Loader;