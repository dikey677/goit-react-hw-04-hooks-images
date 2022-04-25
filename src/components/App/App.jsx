import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import Searchbar from '../Searchbar/Searchbar'
import ImageGallery from '../ImageGallery/ImageGallery'

// import Modal from '../Modal/Modal'




export default class App extends React.Component { 
  state = {
    imageName: '',
    // showModal: false
    }
  
    // toggleModal = () => {
    //   this.setState(({showModal}) => ({
    //   showModal: !showModal
    // }))
    // }
  
  handleFormSubmit = imageName => {
      this.setState({imageName})
    }

  render() {
    return (
      <section className='app'>
        <Searchbar onSubmit={ this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName}/>
        
        {/* <button type='button' onClick={this.toggleModal}>Открыть модальное окно</button>
        {this.state.showModal && <Modal onClose={ this.toggleModal } onClick={ this.toggleModal } onClickBackDrop={ this.toggleModal }></Modal>} */}
        
        <ToastContainer autoClose={3000} />
      </section>
    )
  }
}

