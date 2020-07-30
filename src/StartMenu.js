import React from 'react';
import {BotBtn} from './BotBtn.js'
import {PlayerBtn} from './PlayerBtn.js'

export class StartMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div id="start-menu">
                <br></br>
                <BotBtn className='btn'/>
                <br></br>
                <PlayerBtn className='btn'/>
            </div>
        )
    }
}