import React from "react";
import './ImageGalleryItem.scss'

export default function ImageGalleryItem({ pageURL, alt, largeImageURL, onShowModal}) {
    return (
        <li className="ImageGalleryItem" onClick={() => onShowModal(largeImageURL)}>
            <img className='imageGalleryItem-image' src={pageURL} alt={alt} />
        </li>
    )
}
