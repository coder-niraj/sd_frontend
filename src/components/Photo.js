import React, { useState } from 'react'
import Modal from 'react-modal';
const Photo = () => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [open, setOpen] = useState(true);
    function closeModal() {
        setOpen(false);
    }
    let subtitle;
    return (
        <>
            <Modal
                isOpen={open}
                // onAfterOpen={afterOpenModal}

                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="buttons flex justify-end mb-3">
                    <button onClick={closeModal}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="title bg-red-400 px-4 py-3 text-center rounded-md text-3xl">
                    header
                </div>
                <div className="content">
                    <div className="box m-3">
                        <img src="https://firebasestorage.googleapis.com/v0/b/fir-92a78.appspot.com/o/images%2F9ee46372-ddb2-49f3-9fc3-548a0af8dbb8pexels-pixabay-65924.jpg?alt=media&token=a3a1dc34-d1f8-4111-ac83-51fc1d2e659b" className='h-[250px] w-[250px]' />
                    </div>
                </div>
                <div className="footer flex justify-around">

                    <button className='border-2 border-white bg-black text-white w-full py-[5px] text-lg rounded-md' onClick={closeModal}>not</button>

                    <button className='border-2 border-white hover:bg-red-600 active:bg-red-800 text-white transition-all bg-red-500 w-full py-[5px] text-lg rounded-md' onClick={closeModal}>send</button>

                </div>
            </Modal>
        </>
    )
}

export default Photo