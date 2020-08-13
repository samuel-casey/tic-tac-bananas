import React from 'react'
import HappyBanana from './images/transparent-happy-banana.png'

export const Home = (props) => {
    return (
        <div id="home-container">
            <div id="home-banana">
                <img src={HappyBanana} alt="happy-banana" />
            </div>
        </div>
    )
}

