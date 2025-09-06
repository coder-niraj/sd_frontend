import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import atoms from '../../../atoms'
import NavBar from '../../../components/NavBar'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { storage } from "../../../firebaseContainer/index"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import api from '../../../api'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
const { v4: uuidv4 } = require('uuid');

const EditGroup = () => {
    const userData = useRecoilValue(atoms.currentUserData)
    const [groupData, setGroupData] = useRecoilState(atoms.groupChat)
    const [url, setUrl] = useState(userData.avatar)
    const [file, setFile] = useState(null)
    const [name, setName] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const { handleSubmit, register, formState } = useForm()
    let { errors } = formState
    const displayImage = () => {
        if (file) {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file);
            oFReader.onload = function (oFREvent) {
                setUrl(oFREvent.target.result)
            };
        }
    }
    const ImageReader = () => {
        if (file !== null) {
            displayImage()
        }
        return (
            <>
                <img className='w-[200px] h-[200px] rounded-md ' src={url} />
            </>
        )

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



    const onSubmit = (value) => {
        setLoading(true)
        if (file) {
            uploadImage(file)
                .then(urlObj => {
                    value.avatar = urlObj
                    value.groupId = groupData._id
                    api.UpdateGroup(value, userData.tokens.secretToken
                    ).then(obj => {
                        setLoading(false)
                        toast.success(obj.note)
                        setGroupData({})
                        navigation("/home/group")
                    }).catch(err => {
                        setLoading(false)
                        toast.error(err?.note)
                    })
                }).catch(err => {
                    setLoading(false)
                    toast.error(err?.message)
                })
        } else {
            value.avatar = url
            value.groupId = groupData._id
            api.UpdateGroup(value, userData.tokens.secretToken
            ).then(obj => {
                setLoading(false)
                toast.success(obj.note)
                setGroupData({})
                navigation("/home/group")
            }).catch(err => {
                setLoading(false)
                toast.error(err?.note)
            })
        }

    }

    return (
        <div>
            <NavBar />
            <div className="box bg-slate-200 flex justify-center place-items-center h-[90vh]">
                <div className="update">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bar px-3">
                            <div
                                onClick={() => navigation("/group-profile")}
                                className="back cursor-pointer transition-all w-fit duration-[100ms] hover:scale-[1.2] active:scale-[1] absolute text-4xl left-[10px] top-[10vh]">
                                <i class="bi bi-arrow-left"></i>
                            </div>
                            <div className="group profile bg-white w-fit text-base flex justify-center place-items-center py-5 rounded-md shadow-md flex-col">
                                <div className="title text-xl mb-3">
                                    Edit Group
                                </div>
                                <div className="profile-photo">
                                    {ImageReader()}
                                </div>

                                <div className="relative isolate flex cursor-pointer mt-5 py-2 justify-center">
                                    <button className='absolute cursor-pointer z-[-1] bg-red-500 px-3 top-0 py-2 rounded-md '>select Image</button>
                                    <input type="file" className='w-[250px] cursor-pointer opacity-0' accept='image/*' onChange={(e) => {
                                        if (e.target.files[0]) {
                                            setFile(e.target.files[0])
                                        }
                                    }
                                    } />
                                </div>

                                <div className="name  mt-[5px]">
                                    <div>
                                        Group Name :
                                    </div>
                                    <input type="text"
                                        defaultValue={groupData.name}
                                        {
                                        ...register("name", {
                                            maxLength: {
                                                value: 15,
                                                message: "maximum 15 characters allowed"
                                            }
                                        })
                                        }
                                        placeholder='Enter Group name....' className='py-2 rounded-md px-2 border-2 outline-none' onChange={(e) => setName(name)} />
                                    {
                                        errors?.name?.message ?
                                            <h2>
                                                {errors?.name?.message}
                                            </h2>
                                            : ""
                                    }
                                </div>

                                <div className="submit mt-[30px] w-full flex justify-center place-content-center place-items-center ">
                                    {loading ?
                                        <button disabled className='bg-red-500 cursor-not-allowed py-2 px-3 rounded-md'>
                                            <Loader color={"#FFF"} />
                                        </button>
                                        :

                                        <button type='submit' className='bg-red-500 py-2 px-3 rounded-md'>Update</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditGroup