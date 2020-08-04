import React from 'react';
import {BotBtn} from '../Components/BotBtn.js'
import {PlayerBtn} from '../Components/PlayerBtn.js'
import {OnlineBtn} from '../Components/OnlineBtn.js'

export const StartMenu = (props) => {
        return (
            <div id="start-menu">
                <OnlineBtn className='btn' id='online-btn' onClick={props.onlineCallback} />
                <br></br>
                <BotBtn className='btn' id='bot-btn' onClick={props.botCallback}/>
                <br></br>
                <PlayerBtn className='btn' id='player-btn' onClick={props.playerCallback}/>
            </div>
        )
}