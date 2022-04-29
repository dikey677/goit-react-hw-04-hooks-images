import {useState} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import Searchbar from '../Searchbar/Searchbar'
import ImageGallery from '../ImageGallery/ImageGallery'


export default function App() {
  const [imageName, setImageName] = useState('')

  const handleFormSubmit = (imageName) => {
      setImageName(imageName)
  }

  return (
      <section className='app'>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery imageName={imageName}/>
        <ToastContainer autoClose={3000} />
      </section>
    )
 }


