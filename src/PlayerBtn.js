import React from 'react';

export const PlayerBtn = (props) => {
    return <button className={props.className} onClick={() => {console.log('player')}}>Play locally vs. a friend</button>
}