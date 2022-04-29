import {useState} from "react";
import { toast } from "react-toastify";
import './Searchbar.scss'

export default function Searcbar({onSubmit}) {
    const [imageName, setImageName] = useState('')

    const handleInputChange = (event) => {
        setImageName(event.currentTarget.value.toLowerCase());
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (imageName.trim() === '') {
            toast.error('Ввидите название изображения!')
            return;
        }
        onSubmit(imageName)
        setImageName({ imageName: '' })
        event.target.reset()
    }

    return (
            <header className="searchbar">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <button type="submit" className="searchForm-button">
                        <span className="searchForm-button-label">Search</span>
                    </button>

                    <input
                        onChange={handleInputChange}
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

// export default class Searcbar extends React.Component {
//     state = {
//         imageName: '',
//         }
    
//     handleInputChange = (e) => {
//         this.setState({ imageName: e.currentTarget.value.toLowerCase() });
//         // console.log(this.state.imageName)
        
//     }

//     handleSubmit = e => {
//         e.preventDefault()

//         if (this.state.imageName.trim() === '') {
//             toast.error('Ввидите название изображения!')
//             return
//         }

//         this.props.onSubmit(this.state.imageName)
//         this.setState({ imageName: '' })
//         e.target.reset()
        
//     }
    
//     render() {
//         return (
//             <header className="searchbar">
//                 <form className="searchForm" onSubmit={this.handleSubmit}>
//                     <button type="submit" className="searchForm-button">
//                         <span className="searchForm-button-label">Search</span>
//                     </button>

//                     <input
//                         onChange={this.handleInputChange}
//                         className="searchForm-input"
//                         type="text"
//                         autoComplete="off"
//                         autoFocus
//                         placeholder="Search images and photos"
//                     />
//                 </form>
//             </header>
//         )
//     }
    

// }
