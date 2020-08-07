import React from 'react'
import {LoadingIndicator} from '../GameComponents/LoadingIndicator'
import {Opponent} from '../GameComponents/Opponent'

export class OpponentContainer extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            this.props.value === null ? <LoadingIndicator /> :
            <Opponent className={'opponent'} id={'opponent'} value={this.props.value} />
        )
    }
}