import React, { useRef, useState } from 'react'
import Chat from "./Chat"
import moment from "moment"
import { useSocketStore } from '../../../components/Sockets';
import ImageModal from './ImageModal';
const BottomBar = ({ chats, setChats, userChatData, userData }) => {

    const [open, setOpen] = useState(false);
    let { socket, socketSend } = useSocketStore()
    let [err, setErr] = useState(null)


    function setFocus() {
        document.getElementById('w-input-text').focus();
    }

    if (err) {
        setTimeout(() => {
            setErr(null)
        }, 3000)
    }


    const sendMessage = (msg) => {
        socketSend("message", msg)
    }

    return (
        <>
            <div className="bottom bg-white fixed w-full" style={{ bottom: "0px" }}>
                <div className='flex justify-center mb-2'>
                    <div className="searchBar relative">
                        <div id="w-input-container" onClick={setFocus}>
                            <div className="w-input-text-group">
                                <div id="w-input-text" contentEditable></div>
                                <div className="w-placeholder">
                                    Type a message
                                </div>
                            </div>

                        </div>

                        {
                            err ?
                                <div className="err smallTriangle bg-slate-300 px-3 py-1 absolute top-[-30px] rounded-md text-red-700 left-[15px]">
                                    {err}
                                </div>
                                : ""
                        }

                    </div>

                    <div className="div flex gap-4 place-items-center ">

                        <button
                            className='bg-red-600 px-3 rounded-md py-[5px] h-fit'
                            onClick={() => {
                                let date = moment(new Date()).format("DD/MM/YYYY")
                                let time = moment(new Date()).format("HH:mm:ss")
                                let messages = document.querySelector("#w-input-text")
                                if (messages.innerHTML != "") {
                                    // new message object 
                                    let Message = new Chat(
                                        userData._id,
                                        userChatData._id,
                                        messages.innerHTML,
                                        false,
                                        time,
                                        date,
                                        "text"
                                    )

                                    //just for display
                                    setChats([...chats, {
                                        ...Message
                                    }])
                                    //for send message
                                    sendMessage(Message)
                                    messages.innerHTML = ""
                                } else {
                                    setErr("please enter to text message")
                                }
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#dc2626" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>

                        </button>


                        <div className="tooltip">

                            <button
                                className='bg-white px-2 text-2xl border-2 border-red-600 rounded-md text-red-600 py-[3px] h-fit'
                                onClick={() => {
                                    setOpen(true)
                                    // let date = moment(new Date()).format("DD/MM/YYYY")
                                    // let time = moment(new Date()).format("HH:mm:ss")
                                    // let messages = document.querySelector("#w-input-text")
                                    // if (messages.innerHTML != "") {
                                    //     // new message object 
                                    //     let Message = new Chat(
                                    //         userData._id,
                                    //         userChatData._id,
                                    //         messages.innerHTML,
                                    //         false,
                                    //         time,
                                    //         date,
                                    //         "text"
                                    //     )

                                    //     //just for display
                                    //     setChats([...chats, {
                                    //         ...Message
                                    //     }])
                                    //     //for send message
                                    //     sendMessage(Message)
                                    //     messages.innerHTML = ""
                                    // } else {
                                    //     setErr("please enter to text message")
                                    // }
                                }}>
                                <i class="bi bi-file-earmark-image"></i>
                            </button>
                            <span className="tooltiptext top-[-85%]">
                                Select Image
                            </span>
                        </div>





                    </div>
                </div>
                <ImageModal
                    chats={chats}
                    setChats={setChats}
                    open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default BottomBar