import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useRecoilValue } from 'recoil'
import atoms from "../../atoms/index"
import ChatScreen from './components/ChatScreen'
import api from '../../api'
const Group = () => {
    let userData = useRecoilValue(atoms.currentUserData)
    const [groups, setGroups] = useState([])
    const [loader, setLoader] = useState(false)
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        setLoader(true)
        api.getAllGroups(userData.tokens.secretToken)
            .then(groupArr => {
                setLoader(false)
                setFiltered(groupArr.data)
                setGroups(groupArr.data)
                console.log("group : ", groupArr)
            })
            .catch((err) => {
                setLoader(false)
                console.log("err :", err)
            })
    }, [])
    return (
        <>
            <NavBar user={userData} />
            <ChatScreen filtered={filtered} setFiltered={setFiltered} groups={groups} setGroups={setGroups} loader={loader} setLoader={setLoader} />
        </>
    )
}

export default Group