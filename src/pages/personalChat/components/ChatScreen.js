import React, { useEffect, useState } from 'react'
import { useSocketStore } from '../../../components/Sockets'
import atoms from '../../../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
// import { Scrollbar } from 'smooth-scrollbar-react';
import Loader from '../../../components/Loader'
import _ from "lodash"
import { toast } from 'react-toastify';
import api from '../../../api/index';
import LoaderSkeleton from "../../../components/LoaderSkeleton"
import Message from './Message'
import Photo from '../../../components/Photo'
const ChatScreen = ({ padding, setPadding }) => {
    const [users, setUsers] = useState([])
    let userData = useRecoilValue(atoms.currentUserData)
    let [chatUserData, setChatUserData] = useRecoilState(atoms.chatUserData)
    let [loader, setLoader] = useState(false)
    let { socket, socketSend } = useSocketStore()
    const [loading, setLoading] = useState(true);
    const [getUsers, setGetUsers] = useState(false)
    const [filtered, setFiltered] = useState([])

    function listeningMessage() {
        socket.on("res-message", () => {
            setGetUsers(!getUsers)
        })
    }
    const filterUser = (search) => {
        if (search) {
            let searched = search;
            let searchTxt = "";
            if (searched) {
                const regExp = new RegExp(searched, "i");
                searchTxt = regExp;
            }

            let searchedData = users.filter(user => {
                if (searchTxt.test(user?.name)) {
                    return user
                }
            })
            setFiltered(searchedData)
        } else {
            setFiltered(users)
        }
    }




    useEffect(() => {
        setLoader(true)
        api.getMessageUsers(null, userData.tokens.secretToken)
            .then((userArr) => {
                console.log(userArr.data)
                setLoader(false)
                setFiltered(userArr.data)

                setUsers(userArr.data)
            })
            .catch((err) => {
                setLoader(false)
                toast.error(err)
            })
        socketSend("user_connected", userData)
        console.log("here")
        listeningMessage();
    }, [getUsers])

    const handleImageLoad = () => {
        setLoading(false);
    };



    const startChat = (user) => {
        setChatUserData(user)
    }

    let search = _.debounce((e) => {
        filterUser(e);
    }, 800)
    const removeScrollAfterChatOpen = () => {
        if (chatUserData?._id) {

            return (
                <div className='h-[93.6vh] overflow-hidden'>
                    <Message
                        users={filtered}
                        setUsers={setFiltered}
                        setPadding={setPadding} />
                </div>
            )
        } else {
            return (
                <div className='h-[93.6vh] overflow-scroll'>
                    <div className="bar  py-2">
                        <div className="searchBa bg-white px-5 rounded-md border mx-4 border-slate-800 flex gap-3 py-1 w-fit
                        place-items-center
                        "

                        >
                            <i className="bi bi-search text-xl cursor-pointer"></i>
                            <input type="text" placeholder='Search...' className=' py-1 outline-none' onChange={(e) => {
                                search(e.target.value)
                            }
                            } />
                        </div>
                    </div>
                    {loader ?
                        <div className='w-full flex place-items-center py-3 align-middle justify-center'>
                            <Loader color={"#fc7458"} />
                        </div>
                        :
                        filtered.length ? filtered.map((user, i) => {
                            console.log("here ", user?.newMessage)

                            return (
                                <>
                                    <div key={i} className='px-4 transition-all border active:bg-slate-300 cursor-pointer hover:bg-slate-200 flex py-4 gap-5 place-items-center '
                                        style={{
                                            boxShadow: 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset'
                                        }}
                                        onClick={() => startChat(user)} >
                                        <div>
                                            {loading &&
                                                <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                                                    <LoaderSkeleton height={"50px"} width={"50px"} />
                                                </div>
                                            }
                                            <img
                                                src={user?.avatar}
                                                style={{
                                                    display: loading ? 'none' : 'block',
                                                    height: "50px",
                                                    width: "50px",
                                                    position: loading ? 'absolute' : 'relative',
                                                }}
                                                onLoad={handleImageLoad}
                                                className='rounded-full'

                                            />

                                        </div>
                                        <div className='user flex gap-1'>
                                            <div className='flex flex-col'>
                                                <div>
                                                    {user?.name}
                                                </div>
                                                <div className='email text-xs text-slate-500 pb-1'>
                                                    {user?.email}
                                                </div>
                                            </div>
                                            {user?.newMessage ? <div className="new-message text-xs bg-red-700 h-fit px-1 text-white rounded-full scale-70">
                                                new
                                            </div>
                                                : ""}
                                        </div>
                                    </div >
                                </>

                            )
                        }) : "no user found"
                    }
                </div>
            )

        }
    }

    return (
        <div>
            {
                removeScrollAfterChatOpen()
            }
        </div>
    )
}

export default ChatScreen