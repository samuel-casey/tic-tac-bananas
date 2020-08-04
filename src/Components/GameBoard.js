import React from 'react'
import {Box} from './Box.js'

export class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const boxNo = e.target.id
    
    if (this.props.gameType === "online" && this.props.gameOver === false) {
      this.props.onClick(boxNo)
      setTimeout( () => {
        this.props.autoPick()
      }, 3000)
    } else if (this.props.gameType === "bot" && this.props.gameOver === false) {
      this.props.onClick(boxNo)
      setTimeout( () => {
        this.props.autoPick()
      }, 800)
    } else if (this.props.gameType === "local" && this.props.gameOver === false) {
      this.props.onClick(boxNo)
    } else {
      return
    }
  }

  showBox(i) {
    return (
      <Box
        fromturn={this.props.boxes[i].fromTurn}
        key={'box_'+i}
        id={i}
        value={this.props.boxes[i].value}
        className={this.props.boxes[i].className}
        onClick={this.handleClick}
      />
    )
  }

  render() {   
    return (
      <div>
        <br></br>
        <br></br>
        <div className="game-board">
          <div className="board-col-1">
            {this.showBox(0)}
            {this.showBox(1)}
            {this.showBox(2)}
          </div>
          <div className="board-col-2">
            {this.showBox(3)}
            {this.showBox(4)}
            {this.showBox(5)}
          </div>
          <div className="board-col-3">
            {this.showBox(6)}
            {this.showBox(7)}
            {this.showBox(8)}
          </div>
        </div>
      </div>
    )
  }

}
