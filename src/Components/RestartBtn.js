import React from 'react';

export const RestartBtn = (props) => {
    return <button className={props.className} onClick={props.onClick} >{props.value}</button>
}