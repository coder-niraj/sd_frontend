import React from 'react'
import Modal from 'react-modal';
const ImageView = ({ open, setOpen, displayImage }) => {
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

    return (
        <>


            <Modal
                isOpen={open}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}

                contentLabel="Example Modal"
            >
                <div className="title text-center flex justify-between px-3 text-xl py-3">
                    Image View

                    <div className="closeButton">
                        <button onClick={closeModal}><i class="bi bi-x-lg"></i></button>
                    </div>
                </div>
                <div className="image">
                    <img src={displayImage} className='h-[350px] w-[350px]' />
                </div>
                <div className="buttons flex justify-center mt-3">
                    <button style={{ boxSizing: "border-box" }} className='border-2 text-red-700 border-red-700 w-full py-1 px-4 rounded-md scale-[0.95] hover:scale-[1] active:scale-[0.95] transition-all duration-[200ms] text-xl hover:bg-red-700 hover:text-white' onClick={closeModal}>
                        close
                    </button>
                </div>
            </Modal>

        </>
    )
}

export default ImageView