import React, { useEffect, useState } from 'react'
import BottomBar from './Bottombar'
import { css } from '@emotion/css'
import ScrollToBottom from 'react-scroll-to-bottom';
import atoms from '../../../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSocketStore } from '../../../components/Sockets'
import api from '../../../api'
import Chatbar from './Chatbar'
import moment from 'moment'
import parse from 'html-react-parser';
import Loader from '../../../components/Loader';
import ImageView from './ImageView';

const Message = () => {
    let [groupData, setGroupData] = useRecoilState(atoms.groupChat)
    const [chats, setChats] = useState([])
    let { socket, socketSend } = useSocketStore()
    const [loading, setLoading] = useState(false)
    const userData = useRecoilValue(atoms.currentUserData)
    let [displayImage, setDisplayImage] = useState("")
    let [open, setOpen] = useState(false)


    const ROOT_CSS = css({
        height: "80vh",
        width: "100%",
        paddingBottom: "55px",
    });

    function listeningMessage() {
        socket.on("group-res-message", () => {
            console.log("user connected to group")
        })
        socket.on("group-send-message", (data) => {
            console.log("data 1 : ", data)
            setChats(old => [...old, data])
        })
    }
    useEffect(() => {
        setLoading(true)
        api.GroupMessages({ groupId: groupData.groupId }, userData.tokens.secretToken)
            .then(val => {
                setLoading(false)
                setChats(val.data)
                console.log('val', val)
            }).catch(err => {
                setLoading(false)
                console.log('err', err)
            })
        socketSend("joinGroup", groupData)
        listeningMessage();
    }, [])


    const seenAllNewMessages = () => {

        setGroupData({})
    }


    const setMessages = (message) => {
        let displayMessage = parse(message.message)
        let msgType = parse(message.msgType)
        let displayName = parse(message.fromName)
        let avatar = parse(message.avatar)
        let resDate = moment(new Date(message?.msgDate + " " + message?.msgTime)).format("DD/MMM HH:mm")

        const setMessageType = () => {
            if (msgType == "text") {
                return (
                    <>
                        {displayMessage}
                    </>
                )
            }
            else if (msgType == "image") {

                return (
                    <>

                        <img src={displayMessage} className='h-[150px] w-[150px] rounded-md' onClick={() => {
                            console.log("display : ", displayMessage)
                            setDisplayImage(displayMessage)
                            setOpen(true)
                        }
                        } />
                    </>
                )
            }
        }

        if (message.from == userData._id) {


            return (
                <div className="align flex justify-end m-1 ">
                    <div className='flex gap-1 flex-col'>
                        <div className='right bg-red-300 px-3 py-2 rounded-md'>
                            {setMessageType()}
                        </div>
                        <div className='text-[11px] text-right' style={{
                            fontFamily: "sans-serif"
                        }}>
                            {resDate}
                        </div>
                    </div>
                </div>

            )
        } else {


            return (
                <div className="align flex my-5 w-fit  pb-[25px] relative flex-col gap-1 justify-start m-1 ">
                    <div className="flex gap-3 ">
                        <div className="profilePhoto flex ">
                            <img src={avatar} className='mt-[-10px] h-[50px] w-[50px] rounded-full' />

                        </div>
                        <div className="flex flex-col">
                            <div className="name text-sm">
                                {displayName}
                            </div>
                            <div className='left w-fit h-fit mt-2 bg-slate-200 px-3 py-2 rounded-md'>
                                {setMessageType()}
                            </div>
                        </div>
                    </div>
                    <div className='text-[11px] absolute bottom-0 right-0  w-fit' style={{
                        fontFamily: "sans-serif"
                    }}>
                        {resDate}
                    </div>
                </div>
            )
        }
    }


    return (
        <>
            <div className="messageBox h-[90vh]">


                <div className='flex gap-3 px-4 py-3' style={{
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 5px"
                }}>
                    <button
                        onClick={seenAllNewMessages}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <Chatbar />
                </div>

                <BottomBar chats={chats} setChats={setChats} groupData={groupData} userData={userData} />


                <ScrollToBottom className={ROOT_CSS}>
                    <div className="chat py-4 overflow-y-auto px-5 mt-[10px] gap-[20px] flex flex-col">

                        {
                            loading ?
                                <div className="middle py-4 flex justify-center">
                                    <Loader color={"#eb3434"} />
                                </div>
                                :
                                chats.map((chat) => {
                                    console.log("--- ", chat)
                                    return (
                                        <>
                                            <div>
                                                {
                                                    setMessages(chat)
                                                }
                                            </div>
                                        </>
                                    )
                                })
                        }
                    </div>
                </ScrollToBottom>
                <ImageView open={open} setOpen={setOpen} displayImage={displayImage} />
            </div>
        </>
    )
}

export default Message