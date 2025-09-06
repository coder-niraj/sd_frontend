import React from 'react'

import { useState } from 'react';

import { useRecoilValue } from 'recoil';
import NavBar from '../../components/NavBar';
import atoms from "../../atoms/index"
import ChatScreen from './components/ChatScreen';
const Personal = () => {
    let userData = useRecoilValue(atoms.currentUserData)
    let chatUserData = useRecoilValue(atoms.chatUserData)
    let [padding, setPadding] = useState(40)
    return (
        <>
            <div className='h-[100vh] w-[100vw] overflow-hidden'>
                <NavBar user={userData} />
                <div className='h-[93.6vh] overflow-hidden'>
                    <ChatScreen
                        padding={padding}
                        setPadding={setPadding} />
                </div>
            </div>
        </>
    )
}

export default Personal