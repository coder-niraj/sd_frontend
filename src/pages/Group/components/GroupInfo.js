import React, { useEffect, useState } from 'react'
import NavBar from "../../../components/NavBar"
import { useRecoilState } from 'recoil'
import atoms from '../../../atoms'
import LoaderSkeleton from '../../../components/LoaderSkeleton'
import api from '../../../api'
import { toast } from "react-toastify"
import Loader from '../../../components/Loader'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import AddUserModel from './AddUserModel'
const GroupInfo = () => {

    let navigation = useNavigate()

    let [groupData, setGroupData] = useRecoilState(atoms.groupChat)
    let [userData, setUserData] = useRecoilState(atoms.currentUserData)
    let [groupDetails, setGroupDetails] = useState(groupData.users)
    let [exit, setExit] = useState(false)
    let [deletes, setDeletes] = useState(false)
    console.log('groupDetails', groupDetails)
    useEffect(() => {
        if (groupDetails == undefined) {
            navigation("/home/group")
        }
    })


    const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false)
    const handleImageLoad = () => {
        setLoading(false);
    };



    const setAdmin = (user) => {
        if (groupData.admin == user.id) {
            return (
                <>
                    admin
                </>
            )
        }
    }

    const setYouOnCurrentUser = (user) => {
        console.log('user 1', user.id)
        console.log('user 3', userData._id)
        if (user.id == userData._id) {
            return (
                <>
                    you
                </>
            )
        } else {
            return (
                <>
                    {user.name}
                </>
            )
        }
    }

    const sortForCurrentUser = () => {
        let temp = [...groupDetails];
        let result = []
        let youAre = temp.filter(data => data.id == userData._id)
        let others = temp.filter(data => data.id != userData._id)
        setGroupDetails([...youAre, ...others])

    }

    const kickGroupMember = (userId) => {
        setLoader(true)
        let groupId = groupData._id
        api.kickMember({ groupId, userId }, userData.tokens.secretToken)
            .then(obj => {
                setLoader(false)
                setGroupData({})
                navigation("/home/group")
                toast.success(obj.note)

            }).catch(err => {
                setLoader(false)
                console.log("err", err)
                toast.error(err.note)
            })
    }

    const deleteButtonAdmin = (user) => {
        if (groupData.admin == userData._id && user.id != userData._id) {
            return (
                <>
                    {
                        loader ?
                            <button className='text-white bg-red-700 text-xl h-[40px] w-[40px] rounded-md'
                            >

                                <Loader color={"#fff"} />
                            </button>
                            :
                            <button className='text-white bg-red-700 text-xl h-[40px] w-[40px] rounded-md'
                                onClick={() => kickGroupMember(user.id)}
                            >
                                <i class="bi bi-person-dash-fill"></i>
                            </button>
                    }
                </>
            )
        }
    }


    const filterUser = (search) => {
        if (search) {
            let searched = search;
            let searchTxt = "";
            if (searched) {
                const regExp = new RegExp(searched, "i");
                searchTxt = regExp;
            }

            let searchedData = groupData.users.filter(user => {
                if (searchTxt.test(user?.name)) {
                    return user
                }
            })
            setGroupDetails(searchedData)
        } else {
            setGroupDetails(groupData.users)
        }
    }

    let search = _.debounce((e) => {
        filterUser(e);
    }, 800)

    useEffect(() => {
        sortForCurrentUser()
    }, [])


    const deleteTheGroup = () => {
        setDeletes(true)
        api.deleteGroup({ groupId: groupData._id }, userData.tokens.secretToken)
            .then(obj => {
                setDeletes(false)
                toast.success(obj.note)
                setGroupData({})
                navigation("/home/group")
            }).catch(err => {
                setDeletes(false)
                toast.error(err?.message)
            })
    }

    const ExitTheGroup = () => {
        setExit(true)
        api.ExitGroup({ groupId: groupData._id }, userData.tokens.secretToken)
            .then(obj => {
                setExit(false)
                toast.success(obj.note)
                setGroupData({})
                navigation("/home/group")
            }).catch(err => {

                setExit(false)
                toast.error(err?.note)
            })
    }

    const exitButton = () => {
        return (
            <>

                {
                    deletes ?
                        <div className="cursor-pointer hover:scale-[1.1] active:scale-[1] select-none transition-all exit-button border-2 border-black py-2 text-xl rounded-md w-[80%] text-center">

                        </div>
                        :
                        <div className="cursor-pointer hover:scale-[1.1] active:scale-[1] select-none transition-all exit-button border-2 border-black py-2 text-xl rounded-md w-[80%] text-center"
                            onClick={() => deleteTheGroup()}
                        >
                            <i class="bi bi-trash3"></i>&nbsp;Delete
                        </div>
                }
            </>
        )
    }

    return (
        <>
            <NavBar />


            <div className="box bg-slate-200 max-h-[90vh] overflow-y-auto py-5 flex flex-col place-items-center justify-center">

                <div className="groupData flex mb-5 mt-[200px] px-4 flex-col w-fit justify-center place-items-center py-5 bg-white"
                    style={{
                        boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"
                    }}
                >

                    <div className="title text-2xl  flex justify-between w-full px-5">Group Info
                        {
                            groupData.admin == userData._id ?
                                <div className="adduser">
                                    <button className='text-white bg-red-700 text-xl h-[40px] w-[40px] rounded-md'
                                        onClick={() => navigation("/edit/group")}
                                    >
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                : ""
                        }
                    </div>
                    <div className="group-profile">
                        <img src={groupData.avatar} alt=""
                            className='w-[250px] h-[250px] my-3'
                            style={{
                                boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px'
                            }} />
                    </div>
                    <div className="group-title text-2xl mb-4">
                        {groupData.name}
                    </div>
                    <div className="searchBar mb-5 bg-white    flex gap-3  
                        
                        "

                    >

                        <div className="bar flex gap-3 border px-5 rounded-md border-slate-800 py-1 place-items-center w-fit">

                            <i className="bi bi-search text-xl cursor-pointer"></i>
                            <input type="text" placeholder='Search...' className=' py-1 outline-none' onChange={(e) => {
                                search(e.target.value)
                            }
                            } />
                        </div>
                        {
                            groupData.admin == userData._id ?
                                <div className="adduser">
                                    <button className='text-white bg-red-700 text-xl h-[40px] w-[40px] rounded-md'
                                        onClick={() => setOpen(true)}
                                    >
                                        <i class="bi bi-person-add"></i>
                                    </button>
                                </div>
                                : ""
                        }


                    </div>
                    <div className="groupInfo w-[350px] h-[300px] py-5 overflow-y-auto">


                        {
                            groupDetails.length ?
                                groupDetails?.map((user, i) => {
                                    return (
                                        <>

                                            <div
                                                key={i} className='px-4 transition-all relative border active:bg-slate-300 cursor-pointer hover:bg-slate-200 flex py-4 gap-5 place-items-center '
                                                style={{
                                                    boxShadow: 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset'
                                                }}
                                            // onClick={() => startGroupChat(user)}
                                            >
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
                                                <div className='user flex  gap-1'>
                                                    <div className='flex flex-col'>
                                                        <div>
                                                            <div className="name">

                                                                {setYouOnCurrentUser(user)}
                                                            </div>
                                                            <div className="email text-[13px] text-slate-700">
                                                                {user?.email}
                                                            </div>
                                                            <div className="logo absolute text-sm top-[10px] right-[10px]">
                                                                {setAdmin(user)}

                                                            </div>
                                                            <div className="buttons absolute top-[20px] right-[10px]">
                                                                {deleteButtonAdmin(user)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* {user?.newMessage ? <div className="new-message text-xs bg-red-700 h-fit px-1 text-white rounded-full scale-70">
                                        new
                                    </div>
                                        : ""} */}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                : ''
                        }
                    </div>
                    <div className="buttons w-full gap-3 pt-3 justify-center flex">


                        {
                            exit ?
                                <div className="cursor-pointer hover:scale-[1.1] active:scale-[1] select-none transition-all exit-button border-2 text-red-600 border-red-600 py-2 text-xl rounded-md w-[80%] text-center">
                                    <Loader color={'#dc2626'} />
                                </div>
                                :
                                <div className="cursor-pointer hover:scale-[1.1] active:scale-[1] select-none transition-all exit-button border-2 text-red-600 border-red-600 py-2 text-xl rounded-md w-[80%] text-center"

                                    onClick={() => ExitTheGroup()}>
                                    <i class="bi bi-box-arrow-right"></i>&nbsp;Exit
                                </div>
                        }

                        {
                            groupData.admin == userData._id ?
                                exitButton()
                                : ""
                        }





                    </div>
                </div>
                <AddUserModel open={open} setOpen={setOpen} />

            </div>
        </>
    )
}

export default GroupInfo