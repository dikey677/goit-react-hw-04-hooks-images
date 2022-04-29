import {useState, useEffect} from "react";
import './ImageGallery.scss'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import fetchImage from '../../services/fetchImage'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
}

export default function ImageGallery({imageName}) {
    const [dataState, setDataState] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [showModal, setShowModal] = useState(false);
    const [modalLargeImg, setModalLargeImg] = useState('');
    const [page, setPage] = useState(1);
    // const [maxPage, setMaxPage] = useState(0)

    useEffect(() => {
        if (!imageName) { 
            return;
        }

        console.log('Изменилось название изображения')

        setPage(1)
        setStatus(Status.PENDING)

        fetchImage
            .fetchAPI(imageName, 1)
            .then(data => {
                setDataState(data.hits)
                setStatus(Status.RESOLVED)
            })
            .catch(error => {
                setErrorType(errorType)
                setStatus(Status.REJECTED)
            })
        console.log(dataState)
    }, [imageName])

    const toggleModalOpen = (largeImageURL) => {
        setShowModal(true)
        setModalLargeImg(largeImageURL)
    }

    const toggleModalClose = () => {
       setShowModal(false)
    }

    const loadingImageMore = () => {
        const currentPages = page + 1;

        setPage(currentPages)
        setStatus(Status.PENDING)
        console.log(currentPages)

        fetchImage
            .fetchAPI(imageName, currentPages)
            .then(data => {
                setDataState([...dataState, ...data.hits])
                setStatus(Status.RESOLVED)
                
            })
        console.log(dataState)
    }

    if (showModal === true) {
        return (<Modal
            onClose={toggleModalClose}
            onClick={toggleModalOpen}
            onClickBackDrop={toggleModalClose}
            alt={imageName}
            largeImageURL={modalLargeImg}
        />)

    }

    if (status === Status.IDLE) {
        return <h1 className="title-idle">Введите название изображения</h1>
    }

    if (status === Status.PENDING) {
        return <p className="loader">Загружаем...</p>
    }

    if (!dataState.length) {
        return <h1 className="error">Error, picture <span className="errorImg">{imageName}</span> was not found</h1>
    }

    if (status === Status.RESOLVED) {
        return (<div>
                    <ul className="imageGallery">
                        {
                            dataState && dataState.map(hit =>
                                <ImageGalleryItem key={hit.id} onClick={toggleModalOpen} pageURL={hit.webformatURL} largeImageURL={hit.largeImageURL} alt={imageName} onShowModal={toggleModalOpen} />)
                        }
                    </ul>
                    
                    <div className="button-load-more">
                        <Button onLoading={loadingImageMore} />
                    </div>
                </div>)
    }
}
