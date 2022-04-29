import {useEffect} from "react";
import './Modal.scss'
import { createPortal } from 'react-dom'

const modalRoot = document.querySelector('#modal-root')

export default function Modal({ largeImageURL, alt, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Escape') {
            onClose();
        }
    }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
       
     })

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose()
        }
    }

    return createPortal(
        <div className="overlay" onClick={handleBackdropClick}>
            <div className="modal">
                <img src={largeImageURL} alt={alt} />
            </div>
        </div>, modalRoot)
}
