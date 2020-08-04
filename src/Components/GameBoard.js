import React from 'react'
import {Box} from './Box.js'

export class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const boxNo = e.target.id
    
    if (this.props.botGame == true) {
      this.props.onClick(boxNo)
      setTimeout( () => {
        this.props.autoPick()
      }, 1500)
    } else {
      this.props.onClick(boxNo)
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

  // componentWillUpdate(nextProps) {
  //   if (this.props.history !== nextProps.boxes) {
  //     console.log('GB updated')
  //     console.log(nextProps.boxes[0])
  //     // { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box red' }
  //   }
  // }

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
