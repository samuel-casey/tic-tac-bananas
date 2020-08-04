import React from 'react';

export const PlayerBtn = (props) => {
    return <button id={props.id} className={props.className} onClick={props.onClick}>Play locally vs. a friend</button>
}