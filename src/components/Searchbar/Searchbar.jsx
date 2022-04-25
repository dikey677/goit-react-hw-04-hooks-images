import React from "react";
import { toast } from "react-toastify";
import './Searchbar.scss'

export default class Searcbar extends React.Component {
    state = {
        imageName: '',
        }
    
    handleInputChange = (e) => {
        this.setState({ imageName: e.currentTarget.value.toLowerCase() });
        // console.log(this.state.imageName)
        
    }

    handleSubmit = e => {
        e.preventDefault()

        if (this.state.imageName.trim() === '') {
            toast.error('Ввидите название изображения!')
            return
        }

        this.props.onSubmit(this.state.imageName)
        this.setState({ imageName: '' })
        e.target.reset()
        
    }
    
    render() {
        return (
            <header className="searchbar">
                <form className="searchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="searchForm-button">
                        <span className="searchForm-button-label">Search</span>
                    </button>

                    <input
                        onChange={this.handleInputChange}
                        className="searchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
    

}
