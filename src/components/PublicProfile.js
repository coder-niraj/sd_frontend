import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import atoms from '../atoms'
import LoaderSkeleton from './LoaderSkeleton'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const PublicProfile = () => {
    let ChatData = useRecoilValue(atoms.profileData)
    let userData = useRecoilValue(atoms.currentUserData)

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <NavBar user={userData} />
            <div className="back h-[90vh] relative w-[100vw] flex  flex-col place-items-center bg-slate-200 justify-center">
                <div className="backButton absolute left-0 top-0 text-4xl px-3">
                    <button
                        onClick={() => {
                            navigate("/home")
                        }}
                    ><i className="bi bi-arrow-left"></i></button>
                </div>
                <div className="profile-block profile bg-white px-4 py-5 rounded-sm shadow-md">
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
                            src={ChatData?.avatar}
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

                                {ChatData.name}
                            </div>
                            <div className="email">

                                {ChatData.email}
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
                        {/* <button className='border-2 border-white hover:bg-red-600 active:bg-red-800 text-white transition-all bg-red-500 w-full py-[5px] text-lg rounded-md'>
                            Edit&nbsp;Profile
                        </button> */}
                    </div>

                </div>

            </div>
        </>
    )
}

export default PublicProfile