import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import api from '../../api'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebaseContainer/index"

import atoms from "../../atoms/index"
import GroupManag from './GroupManag'
import LoaderSkeleton from '../../components/LoaderSkeleton'
import Loader from '../../components/Loader'
import { useNavigate } from 'react-router-dom'
const { v4: uuidv4 } = require('uuid');
const GroupRegister = () => {

    let userData = useRecoilValue(atoms.currentUserData)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [name, setName] = useState(null)
    const [usersSelect, setUserSelect] = useState([])
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)
    const [error, setError] = useState("")

    let [loader, setLoader] = useState(true)
    let [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getMessageUsers(null, userData.tokens.secretToken)
            .then((userArr) => {
                console.log(userArr.data)
                setLoader(false)
                setUsers(userArr.data)
            })
            .catch((err) => {
                setLoader(false)
                toast.error(err)
            })
    }, [])

    const handleImageLoad = () => {
        setLoading(false);
    };

    const addToGroup = (user) => {

        let userExist = usersSelect.filter(userObj => userObj.id == user._id)
        //remove user to arr
        if (userExist.length) {

            let temp = usersSelect.filter(userObj => userObj.id != user._id)
            setUserSelect(temp)
            const updatedMessages = users.map((userObj) =>
                userObj._id == user._id ? { ...userObj, select: false } : userObj
            );
            setUsers(updatedMessages)
        }

        else {
            //add user to arr
            const updatedMessages = users.map((userObj) => {

                if (userObj._id == user._id) {
                    return { ...userObj, select: true }
                } else {
                    return userObj
                }
            });
            setUsers(updatedMessages)
            setUserSelect([...usersSelect, { id: user._id, name: user.name, avatar: user?.avatar, email: user?.email }])
        }
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

    const displayImage = () => {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = function (oFREvent) {
            setUrl(oFREvent.target.result)
        };
    }

    const onSubmit = async () => {
        setLoad(true)
        // console.log("users : ", name)
        // console.log("users : ", file)
        // console.log("users : ", usersSelect)
        //display image data


        if (file) {

            uploadImage(file)
                .then(url => {
                    let manager = new GroupManag(name, usersSelect, url)
                    console.log(manager)
                    api.createGroup(manager, userData.tokens.secretToken)
                        .then(obj => {
                            navigate("/home/group")
                            toast.success(obj.note)
                            setLoad(false)
                        }).catch(err => {
                            toast.error(err.note)
                            setLoad(false)
                        })

                })
                .catch(err => {
                    setLoad(false)
                    toast.error(err.message)
                    console.log("err : ", err)
                })
        } else {
            let logo = await fetch("https://avatars.abstractapi.com/v1/?api_key=13051f2a025f4f70a5c8f72a1b2a816e&name=" + name);
            let manager = new GroupManag(name, usersSelect, logo.url)
            console.log(manager)
            api.createGroup(manager, userData.tokens.secretToken)
                .then(obj => {
                    navigate("/home/group")
                    toast.success(obj.note)
                    setLoad(false)
                }).catch(err => {
                    toast.error(err.note)
                    setLoad(false)
                })
        }

    }

    const ImageReader = () => {
        displayImage()
        return (
            <>
                <img className='w-[200px] h-[200px] rounded-full' src={url} />
            </>
        )
    }

    return (
        <>
            <NavBar />
            <div className="register">

                <div className="box h-[90vh] bg-slate-200 flex place-items-center justify-center">
                    <div className="registerForm  w-fit h-fit flex flex-col px-5 py-5 rounded-md bg-white"
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'
                        }}>
                        <div className="title bg-red-500 text-2xl text-center py-3 rounded-md">
                            Create Group
                        </div>
                        <div className="inputs flex flex-col gap-5">
                            <input type="text" className='px-2 py-2 mt-3 outline-0' autoComplete='off'
                                placeholder='Enter Group Name...' name="name" id="name"
                                onChange={(e) => setName(e.target.value)}

                                style={{
                                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'
                                }}
                                required />
                            <div className="button relative isolate flex flex-col  justify-center place-items-center">
                                <div className='  w-fit'>

                                    {
                                        file ? <ImageReader /> :
                                            <div className='text-slate-500'>
                                                no Image selected
                                            </div>
                                    }
                                </div>
                                <div className=' w-fit my-2 flex justify-center'>
                                    <button className='absolute cursor-pointer z-[-1] bg-red-500 px-3 py-2 rounded-md '>select Image</button>
                                    <input type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        accept="image/*"
                                        className='opacity-0    z z-10 cursor-pointer' name="file" id="file" required />
                                </div>
                            </div>
                            <div className="bar flex justify-center">
                                <div className="users w-[400px] max-h-[300px] overflow-scroll overflow-x-hidden">
                                    {
                                        loader ?
                                            <div className='border-2 border-white  cursor-not-allowed text-red-500 transition-all bg-white w-full p-3 flex justify-center text-lg rounded-md'>
                                                <Loader color={"#ef4444"} />
                                            </div>
                                            :
                                            users.length ?
                                                users.map((user, i) => {
                                                    return (
                                                        <>

                                                            <div key={i} className=
                                                                {
                                                                    'px-4 transition-all border active:bg-slate-300 cursor-pointer hover:bg-slate-200  myclass flex py-4 gap-5 place-items-center '
                                                                }
                                                                style={{
                                                                    background: [user?.select ? "rgb(203 213 225)" : "white"],

                                                                    boxShadow: 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset'
                                                                }}
                                                                onClick={() => addToGroup(user)}
                                                            >
                                                                <input type="radio" checked={user?.select ? true : false} />
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

                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                                : ""
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="button flex justify-center text-xl">
                            {
                                load ?
                                    <div className='border-2 border-white  cursor-not-allowed text-white transition-all bg-red-600 w-fit p-3 flex justify-center text-lg rounded-md'>
                                        <Loader color={"#fff"} />
                                    </div>
                                    :
                                    <button
                                        onClick={() => {
                                            onSubmit()
                                        }}
                                        className='bg-red-500 my-2 text-white px-3 py-2 rounded-md border-2 border-red-500 hover:bg-red-600 active:bg-red-800 transition-all'>Create</button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupRegister