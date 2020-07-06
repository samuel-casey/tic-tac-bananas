import React from 'react'
import Box from './Box.js'

class GameBoard extends React.Component {
  
  showBox(i) {
    return (
      <Box
        fromturn={this.props.boxes[i].fromTurn}
        key={'box_'+i}
        value={this.props.boxes[i].value}
        className={this.props.boxes[i].className}
        onClick={() => {this.props.onClick(i)}}
      />
    )
  }

  startOver() {
    return document.location.reload()
  }

  render() {   
    return (
      <div className="game-container">
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
        <div className='undo-btn' onClick={() => { this.startOver() }}>Restart Game</div>
      </div>
    )
  }
}

export default GameBoard
