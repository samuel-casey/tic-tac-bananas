import React from 'react'
import {UndoBtn} from './UndoBtn'

export class UndoBtnContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        const btn = e.target
        this.props.onClick(btn)
    }

    render() {
        return (
            <UndoBtn onClick={this.handleClick}/>
        )
    }
}