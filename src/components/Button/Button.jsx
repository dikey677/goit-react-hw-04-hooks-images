import React from 'react'
import './Button.scss'

export default class Button extends React.Component {
    render() {
        return <button type="button" className="button" onClick={this.props.onLoading}>Load more</button> 
    }
}