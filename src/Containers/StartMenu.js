import React from 'react';
import {BotBtn} from '../Components/BotBtn.js'
import {PlayerBtn} from '../Components/PlayerBtn.js'

export class StartMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div id="start-menu">
                <br></br>
                <BotBtn className='btn' id='bot-btn' onClick={this.props.botCallback}/>
                <br></br>
                <PlayerBtn className='btn' id='player-btn' onClick={this.props.playerCallback}/>
            </div>
        )
    }
}