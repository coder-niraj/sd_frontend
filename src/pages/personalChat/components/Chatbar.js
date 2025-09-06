import React, { useState } from 'react'
import LoaderSkeleton from "../../../components/LoaderSkeleton"
import atoms from '../../../atoms';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
const Chatbar = ({ userChatData }) => {
    let [chatData, setChatData] = useRecoilState(atoms.profileData)
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const handleImageLoad = () => {
        setLoading(false);
    };
    return (
        <div>
            <div className="flex place-items-center gap-4 cursor-pointer" onClick={() => {
                setChatData(userChatData);
                navigate("/public-profile")
            }
            }>
                <div className="avatar">
                    {loading &&
                        <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                            <LoaderSkeleton height={"50px"} width={"50px"} heighLightColor={"#b91c1c"} baseColor={"#8c0303"} />
                        </div>
                    }
                    <img
                        src={userChatData?.avatar}
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
                {
                    userChatData.name
                }
            </div>
        </div >
    )
}

export default Chatbar