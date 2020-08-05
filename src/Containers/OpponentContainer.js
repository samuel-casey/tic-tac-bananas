import React from 'react'
import {LoadingIndicator} from '../Components/LoadingIndicator'
import {Opponent} from '../Components/Opponent'

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