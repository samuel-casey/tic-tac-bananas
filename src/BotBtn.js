import React from 'react'

export const BotBtn = (props) => {
    return <button className={props.className} onClick={() => {console.log('bot')}}>Play vs. computer</button>
}