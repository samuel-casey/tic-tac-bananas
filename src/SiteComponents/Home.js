import React from 'react'
import { Navigation } from './Navigation'

export const Home = (props) => {
    console.log(props)
    return (
        <div id="header">
            <h1><span role="img" aria-label="banana">🍌</span> tic-tac-bananas <span role="img" aria-label="banana">🍌</span></h1>
            <div id="header-instructions">A potassium-filled spin on a classic game.<br></br>First to get three bananas in a row wins!</div>
            <Navigation isLoggedIn={props.isLoggedIn} gameInProgress={props.gameInProgress} toggleGameInProgress={props.toggleGameInProgress}/>
        </div>
    )
}

