import React, { useEffect, useState } from 'react'
import LoaderSkeleton from "./LoaderSkeleton"
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import atoms from "../atoms/index"
const NavBar = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const location = useLocation()
    const [groupData, setGroupData] = useRecoilState(atoms.groupChat)
    const [chatData, setChatData] = useRecoilState(atoms.chatUserData)

    const handleImageLoad = () => {
        setLoading(false);
    };
    let user = useRecoilValue(atoms.currentUserData)
    const [navArr, setNavArr] = useState(
        [
            {
                name: 'users',
                navigate: "/home",
                active: false

            },
            {
                name: 'groups',
                navigate: "/home/group",
                active: false
            }
        ]
    )

    useEffect(() => {
        let temp = navArr
        temp.map(obj => {
            if (location.pathname == obj.navigate) {
                obj.active = true
            }
        })
        setNavArr(temp)

    }, [])
    return (
        <>
            <div className="navbar text-2xl text-white flex py-3 px-5 bg-red-700 place-items-center justify-between">
                Chat&nbsp;App
                <div className="nav flex gap-[30px] text-lg select-none">
                    {
                        navArr.map((item) => {
                            return (
                                <>
                                    <div className='cursor-pointer hover:scale-[1.4] transition-all active:scale-[1.2]'
                                        style={{
                                            transform: item.active ? "translateY(-5px)" : "translateY(0px)",
                                            borderBottom: item.active ? "3px solid white" : ""
                                        }}
                                        onClick={() => {
                                            setChatData({})
                                            setGroupData({})
                                            navigate(item.navigate)
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                </>
                            )
                        })
                    }


                </div>
                <div className="avatar">
                    {loading &&
                        <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                            <LoaderSkeleton height={"50px"} width={"50px"} heighLightColor={"#b91c1c"} baseColor={"#8c0303"} />
                        </div>
                    }

                    <img
                        alt='profilePhoto'
                        src={user?.avatar}
                        style={{
                            display: loading ? 'none' : 'block',
                            height: "50px",
                            width: "50px",
                            position: loading ? 'absolute' : 'relative',
                        }}
                        onLoad={handleImageLoad}
                        onClick={() => {
                            navigate("/profile")
                        }}
                        className='rounded-full cursor-pointer'

                    />

                    {/* <label class="switch">
                        <input type="checkbox">
                            <span class="slider round"></span>
                    </label> */}

                </div>
            </div>
        </>
    )
}

export default NavBar