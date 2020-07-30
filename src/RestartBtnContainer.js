import React from 'react'
import {RestartBtn} from './RestartBtn'

export class RestartBtnContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        const btn = e.target
        console.log(btn)
        this.props.onClick(btn)
    }

    render() {
        return (
            <RestartBtn onClick={this.handleClick}/>
        )
    }
}