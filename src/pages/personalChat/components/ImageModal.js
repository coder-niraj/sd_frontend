import React, { useState } from 'react'
import Modal from 'react-modal';
import { storage } from "../../../firebaseContainer/index"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Chat from './Chat';
import { useRecoilState, useRecoilValue } from 'recoil';
import atoms from '../../../atoms';
import Loader from '../../../components/Loader';
import { useSocketStore } from '../../../components/Sockets';
import moment from 'moment';
import { toast } from 'react-toastify';
const { v4: uuidv4 } = require('uuid');
const ImageModal = ({ open, setOpen, chats, setChats }) => {
    let userData = useRecoilValue(atoms.currentUserData)
    let [loader, setLoader] = useState(false)
    let [userChatData, setUserChatData] = useRecoilState(atoms.chatUserData)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)
    const [err, setErr] = useState(null)
    let { socket, socketSend } = useSocketStore()

    function closeModal() {
        setFile(null)
        setUrl(null)
        setOpen(false);
    }

    const uploadImage = (image) => {
        return new Promise((resolve, reject) => {

            const imageName = uuidv4();
            const imageRef = ref(storage, `images/${imageName + image.name}`);
            uploadBytes(imageRef, image)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                })
                .then((downloadURL) => {
                    resolve(downloadURL);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    const sendImage = (image) => {
        setLoader(true)
        uploadImage(image)
            .then(url => {
                let date = moment(new Date()).format("DD/MM/YYYY")
                let time = moment(new Date()).format("HH:mm:ss")
                let Message = new Chat(
                    userData._id,
                    userChatData._id,
                    url,
                    false,
                    time,
                    date,
                    "image"
                )
                socketSend("message", Message)
                setChats(old => [...old, Message])
                closeModal()
                setLoader(false)
            })

            .catch((err) => {
                console.log(err)
                setLoader(false)
                toast.error(err?.message);
            })
    }

    const displayImage = () => {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = function (oFREvent) {
            setUrl(oFREvent.target.result)
        };
    }

    const ImageReader = () => {
        displayImage()
        return (
            <>

                <img src={url} className='h-[250px] w-[250px]' />

            </>
        )
    }

    return (
        <Modal
            isOpen={open}
            // onAfterOpen={afterOpenModal}

            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="buttons flex justify-between mb-3">
                <div className="title px-4 py-3 text-center rounded-md text-xl">
                    Send image
                </div>
                <button className='text-2xl' onClick={closeModal}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="content ">

                <div className="box m-3">
                    {
                        file ? <ImageReader /> :
                            <div className='text-slate-500 text-2xl h-[250px] w-[250px] flex place-items-center justify-center border-2'
                            >
                                no Image selected
                            </div>
                    }


                </div>
            </div>
            <div className="flex justify-center">
                <div className="select-button border-2 py-2 border-slate-800 rounded-md px-3 w-[250px] overflow-hidden flex relative cursor-pointer justify-center my-2">
                    <input type="file" className='absolute cursor-pointer bg-red-500 py-2 mt-[-10px] opacity-0 mr-[-100px]' accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button className=' texts cursor-pointer flex gap-3'>
                        <i class="bi bi-image-fill"></i> click to Select
                    </button>
                </div>
            </div>
            <div className="err">
                {
                    err ?
                        <div className="err my-2 text-center    rounded-md text-red-700 left-[15px]">
                            {err}
                        </div>
                        : ""
                }
            </div>
            <div className="footer flex justify-around">

                <button className='border-2 border-white bg-black text-white w-full py-[5px] text-lg rounded-md'
                    onClick={closeModal}

                >Back</button>

                {
                    loader ?
                        <button className='border-2 border-white   text-white transition-all bg-red-700 w-full py-[5px] text-lg rounded-md' > <Loader color={"#fff"} /></button>
                        :
                        <button className='border-2 border-white hover:bg-red-600 active:bg-red-800 text-white transition-all bg-red-500 w-full py-[5px] text-lg rounded-md'
                            onClick={
                                () => {
                                    if (file) {

                                        sendImage(file)
                                    } else {
                                        setErr("please select image")
                                    }
                                }
                            }
                        >send</button>
                }



            </div>
        </Modal>
    )
}

export default ImageModal