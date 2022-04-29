import React from 'react'
import './Button.scss'

export default function Button({onLoading}) {
     return (<button type="button" className="button" onClick={onLoading}>Load more</button>) 
}

// export default class Button extends React.Component {
//     render() {
//         return <button type="button" className="button" onClick={this.props.onLoading}>Load more</button> 
//     }
// }