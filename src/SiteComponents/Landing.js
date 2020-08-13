import React from 'react'
import {Navigation} from './Navigation'

export const Landing = (props) => {
    return (
        <div id="home-container">
            <div id="header">
                <h1><span role="img" aria-label="banana">🍌</span> tic-tac-bananas <span role="img" aria-label="banana">🍌</span></h1>
                <Navigation authUser={props.authUser} gameInProgress={props.gameInProgress} toggleGameInProgress={props.toggleGameInProgress} />
                <div id="header-instructions">A potassium-filled spin on a classic game.<br></br>First to get three bananas in a row wins!</div>
            </div>
        </div>
    )
}