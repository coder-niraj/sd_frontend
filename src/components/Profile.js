import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import atoms from '../atoms'
import LoaderSkeleton from './LoaderSkeleton'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const Profile = () => {
    let userData = useRecoilValue(atoms.currentUserData)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const handleImageLoad = () => {
        setLoading(false);
    };
    const Logout = () => {
        localStorage.clear();
        navigate("/login")
    }
    return (
        <>
            <NavBar />
            <div className="relative back h-[90vh] w-[100vw] flex  flex-col place-items-center bg-slate-200 justify-center">
                <div className="backButton absolute left-0 top-0 text-4xl px-3">
                    <button
                        onClick={() => {
                            navigate("/home")
                        }}
                    ><i className="bi bi-arrow-left"></i></button>
                </div>
                <div className="profile-block profile bg-white px-4 py-5 rounded-md shadow-md">
                    {/* <div className=" bg-red-200 px-3 py-3 rounded-md text-3xl">
                        profile
                    </div> */}
                    <div className="title text-2xl text-white text-center mb-3 py-2 rounded-md">
                        Profile
                    </div>
                    <div className="profile-data flex flex-col place-items-center gap-2" style={{ maxWidth: "230px" }}>
                        {loading &&
                            <div className='h-[150px] w-[150px] overflow-hidden'>
                                <LoaderSkeleton height={"150px"} width={"150px"} />
                            </div>
                        }
                        <img
                            src={userData?.avatar}
                            style={{
                                display: loading ? 'none' : 'block',
                                height: "150px",
                                width: "150px",
                                position: loading ? 'absolute' : 'relative',
                            }}
                            onLoad={handleImageLoad}
                            className='rounded-sm'

                        />
                        <div className="data flex flex-col place-items-center">
                            <div className="name text-2xl">

                                {userData.name}
                            </div>
                            <div className="email">

                                {userData.email}
                            </div>
                        </div>
                        <div className="email flex flex-col place-items-center text-center">
                            <label>Description : </label>
                            <span className='text-sm desc'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatum sunt voluptatibus totam eaque voluptate.
                            </span>
                        </div>
                        {/* <div className="social flex gap-4 text-xl mt-3">
                            <i className="cursor-pointer transition-all hover:scale-[1.3] hover:text-slate-400 bi bi-whatsapp"></i>
                            <i className="cursor-pointer transition-all hover:scale-[1.3] hover:text-slate-400 bi bi-telegram"></i>
                            <i className="cursor-pointer transition-all hover:scale-[1.3] hover:text-slate-400 bi bi-github"></i>
                            <i className="cursor-pointer transition-all hover:scale-[1.3] hover:text-slate-400 bi bi-google"></i>
                        </div> */}
                        <button className='border-2 border-white hover:bg-red-600 active:bg-red-800 text-white transition-all bg-red-500 w-full py-[5px] text-lg rounded-md'
                            onClick={() => navigate("/edit/profile")}
                        >
                            Edit
                        </button>
                    </div>

                </div>
                <button onClick={Logout} className='border-2 border-white   text-white transition-all bg-slate-950 w-fit my-2 px-3 py-[5px] text-lg rounded-md'>
                    Log&nbsp;out
                </button>
            </div>
        </>
    )
}

export default Profile