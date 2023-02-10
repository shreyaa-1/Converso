import React from 'react'
import '../styles/modal.css'
import { IoMdClose } from 'react-icons/io'

const Modal = ({ children, setModalOpen, handleClick, btnname }) => {

    return (
        <div className="modal flex-center">
            <div className="modal__content">
                <IoMdClose onClick={() => { setModalOpen(false) }} className='close-btn' />
                {children}
                <button className="btn" onClick={handleClick}>{btnname}</button>
            </div>
        </div>
    )
}

export default Modal