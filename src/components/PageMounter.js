import React, { useEffect, useState } from 'react'
import { useSocketStore } from './Sockets';

const PageMounter = ({ children, auth }) => {
    const { connect, disconnect } = useSocketStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (auth) {
            connect()
            setMounted(true)
        }
    }, [])
    return (
        <>
            {mounted ? children : "not mounted"}
        </>
    )
}

export default PageMounter