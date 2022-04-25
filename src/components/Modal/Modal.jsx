import React from "react";
import './Modal.scss'
import { createPortal } from 'react-dom'

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends React.Component { 
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown',this.handleKeyDown)
     }
    
    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        };
    }
    
    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose()
        }
    }

    render() {
        const { largeImageURL, alt } = this.props

        return createPortal(
        <div className="overlay" onClick={this.handleBackdropClick }>
            <div className="modal">
                <img src={largeImageURL} alt={alt} />
            </div>
        </div>, modalRoot)
    }
}