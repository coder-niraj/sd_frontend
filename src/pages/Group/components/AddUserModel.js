import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import atoms from '../../../atoms';
import api from '../../../api';
import { toast } from 'react-toastify';
import LoaderSkeleton from '../../../components/LoaderSkeleton';
import Loader from '../../../components/Loader';
import { useNavigate } from 'react-router-dom';
const AddUserModel = ({ open, setOpen }) => {
    let [groupData, setGroupData] = useRecoilState(atoms.groupChat)
    let userData = useRecoilValue(atoms.currentUserData)
    let [loader, setLoader] = useState(false)
    let [loading, setLoading] = useState(true)
    let [load, setLoad] = useState(false)
    let [addUsers, setAddUsers] = useState([])
    let [usersSelect, setUserSelect] = useState([])

    let navigation = useNavigate()
    const closeModal = () => {
        setOpen(false)
    }
    const customStyles = {
        overlay: {
            background: "rgb(151, 151, 151,0.5)",
            backdropFilter: 'blur(3px)'
        },
        content: {

            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '  -50%',
            transform: 'translate(-50%, -50%)',
            transition: "all 1s linear",
            boxShadow: "0px 5px 5px 0px #afafaf"
        },
    };


    const handleImageLoad = () => {
        setLoading(false);
    };
    useEffect(() => {
        setLoader(true)
        api.getOtherUsers({ groupId: groupData._id }, userData.tokens.secretToken)
            .then(obj => {
                setLoader(false)
                setAddUsers(obj?.data)
            }).catch(err => {
                setLoader(false)
                toast.error(err?.message)
                console.log('err', err)
            })
    }, [open])


    const addToGroup = (user) => {


        let userExist = usersSelect.filter(userObj => userObj.id == user?._id)
        //remove user to arr
        if (userExist.length) {

            let temp = usersSelect.filter(userObj => userObj.id != user?._id)
            setUserSelect(temp)
            const updatedMessages = addUsers.map((userObj) =>
                userObj._id == user?._id ? { ...userObj, select: false } : userObj
            );
            setAddUsers(updatedMessages)
        }

        else {
            //add user to arr
            const updatedMessages = addUsers.map((userObj) => {

                if (userObj._id == user?._id) {
                    return { ...userObj, select: true }
                } else {
                    return userObj
                }
            });
            setAddUsers(updatedMessages)
            setUserSelect([...usersSelect, { id: user?._id, name: user?.name, avatar: user?.avatar, email: user?.email }])
        }

    }


    const AddUserToGroup = () => {
        setLoad(true)
        let body = {
            groupId: groupData._id,
            users: usersSelect
        }
        console.log('body', body)
        api.AddUser(body, userData.tokens.secretToken)
            .then(obj => {
                setLoad(false)

                toast.success(obj.note)
                setGroupData({})
                navigation("/home/group")
            }).catch(err => {
                setLoad(false)
                toast.error(err?.message)
            })
    }


    return (
        <>


            <Modal
                isOpen={open}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}

                contentLabel="Example Modal"
            >
                <div className="title text-center text-2xl mb-3">
                    Select User To Add
                </div>
                <div className="users h-[300px] w-[300px] overflow-y-auto">
                    {
                        loader ?
                            <div className='border-2 border-white  cursor-not-allowed text-red-500 transition-all bg-white w-full p-3 flex justify-center text-lg rounded-md'>
                                <Loader color={"#ef4444"} />
                            </div>
                            :
                            addUsers.length ?
                                addUsers.map((user, i) => {
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
                <div className="addButtton  flex justify-center">
                    {load ?
                        <button className='py-2 bg-red-700 w-full mt-3 rounded-md cursor-not-allowed '
                        >
                            <Loader />
                        </button> :
                        <button className='py-2 bg-red-500 w-full transition-all duration-[100ms] mt-3 rounded-md scale-[0.95] hover:scale-[1] active:scale-[0.95]'
                            onClick={AddUserToGroup}>
                            Add
                        </button>
                    }

                </div>
            </Modal>
        </>
    )
}

export default AddUserModel