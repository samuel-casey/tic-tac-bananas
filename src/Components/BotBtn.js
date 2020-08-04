import React from 'react'

export const BotBtn = (props) => {
    return <button id={props.id} className={props.className} onClick={props.onClick}>Play vs. computer</button>
}