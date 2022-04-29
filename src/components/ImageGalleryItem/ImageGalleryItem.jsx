import React from "react";
import './ImageGalleryItem.scss'

export default function ImageGalleryItem({ pageURL, alt, largeImageURL, onShowModal}) {
    return (
        <li className="ImageGalleryItem" onClick={() => onShowModal(largeImageURL)}>
            <img className='imageGalleryItem-image' src={pageURL} alt={alt} />
        </li>
    )
}

// export default class ImageGalleryItem extends React.Component { 
//     render() {
//         const { pageURL, alt, largeImageURL} = this.props

//     return (
//         <li className="ImageGalleryItem" onClick={() => this.props.onShowModal(largeImageURL)}>
//             <img className='imageGalleryItem-image' src={pageURL} alt={alt} />
//         </li>
//     )
//   }
// }


  