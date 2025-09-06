import React, { useState } from 'react'
import atoms from '../../atoms'
import { useRecoilValue } from 'recoil'
import PageMounter from '../../components/PageMounter';

const Home = (props) => {
    let userData = useRecoilValue(atoms.currentUserData)
    let chatUserData = useRecoilValue(atoms.chatUserData)

    return (
        <>
            <PageMounter auth={userData}>
                {props.children}

            </PageMounter>
        </>
    )
}

export default Home