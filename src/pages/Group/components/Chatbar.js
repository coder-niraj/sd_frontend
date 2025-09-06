import React, { useState } from 'react'
import LoaderSkeleton from "../../../components/LoaderSkeleton"
import atoms from '../../../atoms/index';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
const Chatbar = ({ userChatData }) => {
    let [GroupData, setGroupChatData] = useRecoilState(atoms.groupChat)
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const handleImageLoad = () => {
        setLoading(false);
    };
    return (
        <div>
            <div className="flex place-items-center gap-4 cursor-pointer" onClick={() => {
                // setChatData(GroupData);
                navigate("/group-profile")
            }
            }>
                <div className="avatar">
                    {loading &&
                        <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                            <LoaderSkeleton height={"50px"} width={"50px"} heighLightColor={"#b91c1c"} baseColor={"#8c0303"} />
                        </div>
                    }
                    <img
                        src={GroupData?.avatar}
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
                    GroupData.name
                }
            </div>
        </div>
    )
}

export default Chatbar