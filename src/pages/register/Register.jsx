import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { storage } from "../../firebaseContainer/index"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import atoms from '../../atoms';
import Loader from '../../components/Loader';

const { v4: uuidv4 } = require('uuid');
const Register = () => {
    const { register, control, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const navigate = useNavigate()
    const [userData, setUserData] = useRecoilState(atoms.currentUserData)
    const [loader, setLoader] = useState(false)
    const handleImageChange = (e) => {

        if (e[0]) {

            return true;
        }
    };
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

    const onSubmit = (data) => {
        setLoader(true)
        api.userExist(data)
            .then((val) => {
                console.log(val)
                uploadImage(data.image[0])
                    .then(url => {
                        api.Register({ ...data, avatar: url })
                            .then(userObj => {
                                localStorage.setItem("login", true)
                                setLoader(false)
                                setUserData(userObj.data)
                                toast.success("user registration success full");
                                navigate("/home")
                            })
                            .catch(err => {
                                setLoader(false)
                                toast.error(err.note);
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoader(false)
                        toast.error(err?.message);
                    })
            }).catch(err => {
                setLoader(false)
                toast.error(err.note);
            })
    }
    const handleSocialLogin = (user, err) => {
        console.log(user);
        console.log(err);
    };
    return (
        <>

            <div className='bg-slate-200 h-[100vh] flex flex-col justify-center place-items-center'>
                <div className='bg-white w-fit px-4 py-5 flex flex-col rounded-sm shadow-md gap-4'>
                    <div className='bg-red-200 px-3 rounded-md py-2 text-center font-bold text-2xl'>
                        Sign&nbsp;Up
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} method='post'>
                        <div className=' flex flex-col gap-3 p-3 text-sm'>
                            <div className="flex flex-col gap-3 place-items-center">
                                <div className='flex gap-3'>
                                    <div className=' p-[4px] rounded-md shadow-slate-300 shadow-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                    </div>

                                    <input
                                        {...register("name", {
                                            required: "name is required",
                                            minLength: {
                                                value: 3,
                                                message: "name must be at least 3 characters long",
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: "maximum 15 characters allowed",
                                            },

                                        })}
                                        type='text' className='outline-none shadow-slate-300 drop-shadow p-2' placeholder='Enter Name...' />

                                </div>
                                {errors.name?.message ? (
                                    <p className="text-red-800">{errors.name?.message}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col gap-3 place-items-center">
                                <div className='flex gap-3'>
                                    <div className=' p-[4px] rounded-md shadow-slate-300 shadow-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                    </div>

                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value:
                                                    /^(?=.{1,256}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid email format",
                                            },

                                        })}
                                        type='text' className='outline-none shadow-slate-300 drop-shadow p-2' placeholder='Enter Email...' />
                                </div>
                                {errors.email?.message ? (
                                    <p className="text-red-800">{errors.email?.message}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col gap-3 place-items-center">
                                <div className='flex gap-3'>
                                    <div className=' p-[4px] rounded-md shadow-slate-300 shadow-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                    </div>
                                    <input
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters long",
                                            },
                                        })}
                                        type='password' className='outline-none shadow-slate-300 drop-shadow p-2' placeholder='Enter Password...' />
                                </div>
                                {errors.password?.message ? (
                                    <p className="text-red-800">{errors.password?.message}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col gap-3 place-items-center">
                                <div className='flex gap-3'>
                                    <div className=' p-[4px] rounded-md shadow-slate-300 shadow-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                    </div>
                                    <input
                                        {...register("image", {
                                            required: "image is required",

                                        })}
                                        type='file'
                                        accept="image/*"
                                        className='outline-none shadow-slate-300 drop-shadow p-2' placeholder='Enter Password...' />
                                </div>
                                {errors.image?.message ? (
                                    <p className="text-red-800">{errors.image?.message}</p>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            {
                                loader ?
                                    <div className='border-2 border-white  cursor-not-allowed text-white transition-all bg-red-700 w-full p-3 flex justify-center text-lg rounded-md'>
                                        <Loader color={"#fff"} />
                                    </div>
                                    :

                                    <button className='border-2 border-white hover:bg-red-600 active:bg-red-800 text-white transition-all bg-red-500 w-full py-[5px] text-lg rounded-md'>
                                        Sign&nbsp;Up
                                    </button>
                            }
                        </div>
                    </form>
                </div>
                <div className="link flex pt-4 text-slate-700 cursor-pointer">
                    Aleardy Signed up ?&nbsp;
                    <div className='text-red-700' onClick={() => {
                        navigate("/login")
                    }}>
                        Sign&nbsp;In&nbsp;here
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register