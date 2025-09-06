import ScrollToBottom from 'react-scroll-to-bottom';
import { useRecoilState, useRecoilValue } from 'recoil'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { css } from '@emotion/css'
import FileSaver from 'file-saver'

import atoms from '../../../atoms'
import { useSocketStore } from '../../../components/Sockets'
import BottomBar from './BottomBar'
import api from '../../../api'
import moment from 'moment';
import Chatbar from './Chatbar';
import Loader from '../../../components/Loader';
import DownloadButton from './DownloadButton';
import ImageView from './ImageView';
const { v4: uuidv4 } = require('uuid');
const Message = ({ users, setUsers, setPadding }) => {
    const [userChatData, setUserChatData] = useRecoilState(atoms.chatUserData)
    const userData = useRecoilValue(atoms.currentUserData)
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)
    let { socket, socketSend } = useSocketStore()
    let [open, setOpen] = useState(false)
    let [displayImage, setDisplayImage] = useState("")
    function listeningMessage() {
        socket.on("res-message", (data) => {
            console.log("data : nnnnn ", data)
            socketSend("seen-message", data)
            if (data?.from == userChatData._id && data.to == userData._id) {
                setChats(old => [...old, data])
            }
        })
    }


    useEffect(() => {
        setLoading(true)
        api.getMessages({ to: userChatData._id },
            userData.tokens.secretToken
        )
            .then(data => {
                setLoading(false)

                console.log(data)
                setChats(data.data)

            }).catch(err => {
                setLoading(false)

                console.log("err ", err)
            })
        listeningMessage();
        setPadding(0)
    }, [])


    console.log("chats : ", chats)


    console.log('displayImage', displayImage)

    const setMessages = (message) => {
        let displayMessage = parse(message.message)
        let msgType = parse(message.msgType)
        var date1 = new Date(message?.msgDate + " " + message?.msgTime);
        let resDate = moment(date1).format("DD/MMMM HH:mm")

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

            //my messages

            return (
                <div className="align flex justify-end m-1 ">
                    <div className='flex gap-1 flex-col'>
                        <div className='right bg-red-300 px-3 py-2 rounded-md'>

                            {/* <div className="relative"> */}
                            {setMessageType()}
                            {/* </div> */}
                        </div>
                        <div className='text-[11px] mr-4 text-right' style={{
                            fontFamily: "sans-serif"
                        }}>
                            {resDate}
                        </div>
                    </div>
                </div>

            )
        } else {

            //friend messages



            return (
                <div className="align flex flex-col gap-1 justify-start m-1 ">
                    <div className='left w-fit bg-slate-200 px-3 py-2 rounded-md'>
                        {setMessageType()}
                    </div>
                    <div className='text-[11px] ml-4' style={{
                        fontFamily: "sans-serif"
                    }}>
                        {resDate}
                    </div>
                </div>
            )
        }
    }


    const ROOT_CSS = css({
        height: "80vh",
        width: "100%",
        paddingBottom: "55px",
    });

    const seenAllNewMessages = () => {
        const updatedMessages = users.map((user) =>
            user._id == userChatData._id ? { ...user, newMessage: false } : user
        );
        setUsers(updatedMessages)
        setUserChatData({})
    }

    return (
        <>
            <div className="messsageBox h-[90vh]">
                <div className='flex gap-3 px-4 py-3' style={{
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 5px"
                }}>
                    <button onClick={seenAllNewMessages}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>



                    </button>

                    <Chatbar userChatData={userChatData} />
                </div>

                <ScrollToBottom className={ROOT_CSS}>


                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                        marginBottom: '50px',
                        marginTop: "20px"

                    }}>


                        {
                            loading ?
                                <div className="middle py-4 flex justify-center">
                                    <Loader color={"#eb3434"} />
                                </div>
                                :
                                chats.map((message, i) => {
                                    return (
                                        <div key={i}>
                                            {
                                                setMessages(message)
                                            }

                                        </div>
                                    )
                                })
                        }
                    </div>

                    <ImageView open={open} setOpen={setOpen} displayImage={displayImage} />
                </ScrollToBottom>
                {/* </div> */}
                <BottomBar chats={chats} setChats={setChats} userChatData={userChatData} userData={userData} />
            </div>
        </>
    )
}

export default Message