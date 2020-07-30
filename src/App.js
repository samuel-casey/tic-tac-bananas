import React from 'react'
import { GameBoard } from './GameBoard'
// import {UndoBtn} from './UndoBtn'
import { UndoBtnContainer } from './UndoBtnContainer'
import { StartMenu } from './StartMenu.js'
import { RestartBtnContainer } from './RestartBtnContainer.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    const boxes = Array(9).fill(null).map(() => ({
      value: null,
      className: 'box ',
      isFull: false,
      fromTurn: null
    }))

    this.state = {
      history: [
        {
          boxes: boxes,
        }
      ],
      isRedNext: true,
      turnNumber: 0,
      vsBot: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  handleClick = (i) => {

    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const boxes = current.boxes.slice();

    if (calculateWinner(boxes) || boxes[i].isFull === true) {
      return;
    }

    const next = this.state.isRedNext

    next ? boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box blue' } : boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box red' }

    console.log(boxes[i])

    this.setState({
      history: history.concat([
        {
          boxes: boxes,
        }
      ]),
      isRedNext: !next,
      turnNumber: history.length
    })
  }

  goBack = (btn) => {
    this.setState({
      turnNumber: this.state.turnNumber - 1,
      isRedNext: !this.state.isRedNext
    })
  }

  restartGame = () => {
    return document.location.reload;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.turnNumber]
    const winner = calculateWinner(current.boxes);

    let status;
    if (winner === 'box blue') {
      status = 'Blue wins!';
    } else if (winner === 'box red') {
      status = 'Red wins!';
    } else {
      status = this.state.isRedNext ? 'Blue\'s turn' : 'Red\'s turn';
    }

    if (this.state.turnNumber !== 0) {
      return (
        <div>
          <div>tic-tac-bananas</div>
          <div className="instructions">{status}</div>
          <GameBoard
            boxes={current.boxes}
            onClick={i => this.handleClick(i)}
          />
          <RestartBtnContainer className={'btn'} onClick={this.restartGame} />
          <UndoBtnContainer onClick={this.goBack} value={this.desc} id='undo-container' key='undo-container' />
        </div>
      )
    } else {
      return (
        <div id="info-container">
          <div>tic-tac-bananas</div>
          <p>Select an option for how you want to play: </p>
          <StartMenu />
          <GameBoard
            boxes={current.boxes}
            onClick={i => this.handleClick(i)}
          />
        </div>
      )
    }
  }
}

const calculateWinner = (boxes) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boxes[a].className !== 'box ' && boxes[a].className === boxes[b].className && boxes[a].className === boxes[c].className) {
      return boxes[a].className;
    }
  }
  return null;
}

export default App
