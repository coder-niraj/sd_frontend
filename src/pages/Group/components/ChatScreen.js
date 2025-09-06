import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import atoms from '../../../atoms'
import _ from 'lodash'
import LoaderSkeleton from '../../../components/LoaderSkeleton'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from './Message'
import { useSocketStore } from '../../../components/Sockets'

const ChatScreen = ({ filtered, setFiltered, groups, setGroups, loader, setLoader }) => {

    let [chatUserData, setChatUserData] = useRecoilState(atoms.chatUserData)
    let userData = useRecoilValue(atoms.currentUserData)
    let [groupData, setGroupData] = useRecoilState(atoms.groupChat)
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])
    let { socket, socketSend } = useSocketStore()

    const navigate = useNavigate()

    const handleImageLoad = () => {
        setLoading(false);
    };
    function listeningMessage() {
        socket.on("res-message", (data) => {
            console.log(data)
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

            let searchedData = groups.filter(group => {
                if (searchTxt.test(group?.name)) {
                    return group
                }
            })
            setFiltered(searchedData)
        } else {
            setFiltered(groups)
        }
    }

    let search = _.debounce((e) => {
        filterUser(e);
    }, 800)

    const startGroupChat = (group) => {
        setGroupData(group)
    }

    console.log("g : ", groupData)


    const removeScrollAfterChatOpen = () => {
        if (groupData?._id) {

            return (
                <div className='h-[87.6vh] overflow-hidden'>
                    <Message
                        groupData={groupData}
                        setGroupData={setGroupData}
                    />
                </div>
            )
        } else {
            return (
                <>

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


                    <div className="createHroup flex fixed bottom-0 right-0 m-[30px] mr-[40px]">

                        <div className="tooltip">
                            <button
                                onClick={() => navigate("/create-group")}
                                className='bg-red-600 hover:bg-red-700 w-[50px] text-2xl outline-none rounded-full scale-[1.1] hover:scale-[1.5] transition-all h-[50px] p-3 mb-3'>
                                <i className="bi bi-people-fill"></i>
                            </button>
                            <span className="tooltiptext">
                                Create group
                            </span>
                        </div>

                    </div>
                    {
                        loader ?
                            <div className='w-full flex place-items-center py-3 align-middle justify-center'>
                                <Loader color={"#fc7458"} />
                            </div>
                            :
                            filtered.length ? filtered?.map((group, i) => {
                                return (
                                    <>
                                        <div
                                            key={i} className='px-4 transition-all border active:bg-slate-300 cursor-pointer hover:bg-slate-200 flex py-4 gap-5 place-items-center '
                                            style={{
                                                boxShadow: 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset'
                                            }}
                                            onClick={() => startGroupChat(group)}
                                        >
                                            <div>
                                                {loading &&
                                                    <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                                                        <LoaderSkeleton height={"50px"} width={"50px"} />
                                                    </div>
                                                }
                                                <img
                                                    src={group?.avatar}
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
                                                        {group?.name}
                                                    </div>
                                                </div>
                                                {/* {group?.newMessage ? <div className="new-message text-xs bg-red-700 h-fit px-1 text-white rounded-full scale-70">
                                        new
                                    </div>
                                        : ""} */}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                                :
                                <div className="center w-full text-center text-2xl mt-3">
                                    no group found
                                </div>
                    }
                </>
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