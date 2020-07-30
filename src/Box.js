import React from 'react'

export const Box = (props) => {
      return (
        <button
        id={props.id}
        fromturn={props.turnNumber}
        className={props.className}
        onClick={props.onClick}>
          {props.value}
        </button>
      );
  }