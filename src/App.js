import React from 'react'
import { GameBoard } from './Components/GameBoard'
import { UndoBtnContainer } from './Containers/UndoBtnContainer'
import { StartMenu } from './Containers/StartMenu.js'
import { RestartBtnContainer } from './Containers/RestartBtnContainer.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    const boxes = Array(9).fill(null).map((index) => ({
      value: null,
      className: 'box ',
      isFull: false,
      fromTurn: null,
      boxNo: index
    }))

    this.state = {
      history: [
        {
          boxes: boxes,
        }
      ],
      isRedNext: true,
      turnNumber: 0,
      botGame: null
    }
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.goBack = this.goBack.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.vsBot = this.vsBot.bind(this)
    this.vsPlayer = this.vsPlayer.bind(this)
    this.autoPick = this.autoPick.bind(this)
  }

  handlePlayerClick = (i) => {

    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const boxes = current.boxes.slice();

    if (calculateWinner(boxes) || boxes[i].isFull === true) {
      return;
    }

    const next = this.state.isRedNext

    next ? boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box blue', boxNo: i } : boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box red', boxNo: i }

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

  handleBotClick = (i) => {
    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const boxes = current.boxes.slice();
    const next = this.state.isRedNext

    if (calculateWinner(boxes) || boxes[i].isFull === true) {
      return;
    }

    boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box blue', boxNo: i }

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

  autoPick = () => {
    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const boxes = current.boxes.slice();
    const next = this.state.isRedNext;

    let filledBoxes = [];
    let emptyBoxes = [];
    
    boxes.forEach((box) => {
      if (box.isFull == true) {
        filledBoxes.push(box)
      } else {
        emptyBoxes.push(box)
      }
    })

    let randBoxNum = Math.floor(Math.random() * emptyBoxes.length)
    
    console.log(randBoxNum)
    
    let botChoice = emptyBoxes[randBoxNum]
    
    boxes[randBoxNum] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box red', boxNo: randBoxNum }

    console.log(boxes[botChoice])

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

  vsBot = () => {
    this.setState({
      botGame: true
    })
  }

  vsPlayer = () => {
    this.setState({
      botGame: false
    })
  }

  restartGame = () => {
    return document.location.reload(true);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.turnNumber];
    const winner = calculateWinner(current.boxes);

    console.log('--current--')
    console.log(current)

    let status;
    if (winner === 'box blue') {
      status = 'Blue wins!';
    } else if (winner === 'box red') {
      status = 'Red wins!';
    } else {
      status = this.state.isRedNext ? 'Blue\'s turn' : 'Red\'s turn';
    }

    // PLAY VS A BOT
    if (this.state.turnNumber >= 0 && this.state.botGame == true) {
      return (
        <div className="game-container">
          <div>tic-tac-bananas</div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={i => this.handleBotClick(i)}
            botGame={this.state.botGame}
            autoPick={this.autoPick}
          />
          <br></br>
          <RestartBtnContainer className={'btn'} onClick={this.restartGame} />
          <br></br>
          <UndoBtnContainer onClick={this.goBack} value={this.desc} id='undo-container' key='undo-container' />
        </div>
      )

      // PLAY VS A HUMAN
    } else if (this.state.turnNumber >= 0 && this.state.botGame == false) {
      return (
        <div className="game-container">
          <div>🍌 tic-tac-bananas 🍌</div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={i => this.handlePlayerClick(i)}
            botGame={this.state.botGame}
          />
          <br></br>
          <RestartBtnContainer className={'btn'} onClick={this.restartGame} />
          <br></br>
          <UndoBtnContainer onClick={this.goBack} value={this.desc} id='undo-container' key='undo-container' />
        </div>
      )
    } else {
      return (
        <div id="info-container">
          <div>tic-tac-bananas</div>
          <p>Select an option for how you want to play: </p>
          <StartMenu botCallback={this.vsBot} playerCallback={this.vsPlayer} />
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={() => { return alert('Please choose an option for how you want to play.') }}
            botGame={this.state.botGame}
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
