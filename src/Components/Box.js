import React, {useEffect} from 'react'

export const Box = (props) => {

    // useEffect(() => {
    //   console.log(props.className)
    // })

      return (
        <button
        id={props.id}
        fromturn={props.turnNumber}
        className={props.className}
        value={props.value}
        onClick={props.onClick}>
          {props.value}
        </button>
      );
  }