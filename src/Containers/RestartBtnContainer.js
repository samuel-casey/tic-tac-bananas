import React from 'react'
import {RestartBtn} from '../GameComponents/RestartBtn'

export class RestartBtnContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        console.log(this.props.onClick)
        this.props.onClick()
    }

    render() {
        return (
            <RestartBtn className={'btn'} onClick={this.handleClick} value={this.props.value}/>
        )
    }
}