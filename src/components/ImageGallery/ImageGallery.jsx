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
    const [dataState, setData] = useState(null);
    const [error, setError] = useState(null);
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
                setData(data.hits)
                setStatus(Status.RESOLVED)
            })
            .catch(error => {
                setError(error)
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
                setData([...dataState, ...data.hits])
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
        return <h1>Введите название изображения</h1>
    }

    if (status === Status.PENDING) {
        return <p>Загружаем...</p>
    }

    if (!dataState.length) {
        return <h1>Ошибка, изображение <span className="errorImg">{imageName}</span> не найдено</h1>
    }

    if (status === Status.RESOLVED) {
        return (<><ul className="imageGallery">
            {
                dataState && dataState.map(hit =>
                    <ImageGalleryItem key={hit.id} onClick={toggleModalOpen} pageURL={hit.webformatURL} largeImageURL={hit.largeImageURL} alt={imageName} onShowModal={toggleModalOpen} />)
            }
                </ul>
            
                <Button onLoading={loadingImageMore} />
            </>)
    }

}

// export default class ImageGallery extends React.Component {
//     state = {
//         data: null,
//         error: null,
//         status: 'idle',
//         showModal: false,
//         modalLargeImg: '',
//         page: 1,
//         maxPage: 0,
//     }

    // async componentDidUpdate(prevProps, prevState) {
    //     const prevName = prevProps.imageName
    //     const currentName = this.props.imageName

    //     if (prevName !== currentName) {
    //         console.log('Изменилось название изображения')

    //         this.setState({ page: 1, status: 'pending' })


    //         fetchImage
    //             .fetchAPI(currentName, 1)
    //             .then(data => this.setState({ data: data.hits, status: 'resolved' }))
    //             .catch(error => this.setState({ error, status: 'rejected' }))


    //     }



    //     console.log(this.state.data)
    // }

//     toggleModalOpen = (largeImageURL) => {
//         this.setState({ showModal: true, modalLargeImg: largeImageURL })
//     }

//     toggleModalClose = () => {
//         this.setState({ showModal: false })
//     }

//     loadingImageMore = () => {

//         const currentName = this.props.imageName
//         const currentPages = this.state.page + 1

//         this.setState({ page: currentPages, status: 'pending' })
//         console.log(currentPages)
//         fetchImage
//             .fetchAPI(currentName, currentPages)
//             .then(data => this.setState({ data: [...this.state.data, ...data.hits], status: 'resolved' }))
//     }


//     render() {
//         const { data, status, modalLargeImg } = this.state
//         const { imageName } = this.props

//         if (this.state.showModal === true) {
//             return (<Modal
//                 onClose={this.toggleModalClose}
//                 onClick={this.toggleModalOpen}
//                 onClickBackDrop={this.toggleModalClose}
//                 alt={imageName}
//                 largeImageURL={modalLargeImg}
//             />)

//         }

//         if (status === "idle") {
//             return <h1>Введите название изображения</h1>
//         }

//         if (status === "pending") {
//             return <p>Загружаем...</p>
//         }

//         if (data.total === 0) {
//             return <h1>Ошибка, изображение <span className="errorImg">{imageName}</span> не найдено</h1>
//         }

//         if (status === "resolved") {
//             return <><ul className="imageGallery">
//                 {
//                     data && data.map(hit =>
//                         <ImageGalleryItem key={hit.id} onClick={this.toggleModalOpen} pageURL={hit.webformatURL} largeImageURL={hit.largeImageURL} alt={imageName} onShowModal={this.toggleModalOpen} />)


//                 }



//             </ul>
//                 <Button onLoading={this.loadingImageMore} />
//             </>
//         }


//     }
// };