import React from 'react'
import { GameBoard } from './Components/GameBoard'
import { UndoBtnContainer } from './Containers/UndoBtnContainer'
import { StartMenu } from './Containers/StartMenu.js'
import { RestartBtnContainer } from './Containers/RestartBtnContainer.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    const boxes = Array(9).fill(null).map((box, index) => ({
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
      gameType: null,
      gameOver: false
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

    next ? boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box blue', boxNo: Number(i) } : boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box red', boxNo: Number(i) }

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

    boxes[i] = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box blue', boxNo: Number(i) }

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

    if (calculateWinner(boxes)) {
      return this.setState({
        gameOver: true
      })
    }
    
    boxes.forEach((box) => {
      if (box.isFull == true) {
        filledBoxes.push(box)
      } else {
        emptyBoxes.push(box)
      }
    })

    console.log('F BEFORE pick')
    console.log(filledBoxes)

    let randBoxNum = Math.floor(Math.random() * emptyBoxes.length)
        
    let botChoice = emptyBoxes[randBoxNum].boxNo

    console.log('BC')
    console.log(botChoice)
    
    // for (let box of boxes) {
    //   if (box.boxNo === randBoxNum) {
    //     console.log("BOX")
    //     console.log(box)
    //     box = { value: '🍌', isFull: true, fromTurn: this.state.turnNumber, className: 'box red', boxNo: Number(randBoxNum) }
    //   }
    // }

    boxes[botChoice].value = '🍌'
    boxes[botChoice].isFull = true 
    boxes[botChoice].fromTurn = this.state.turnNumber
    boxes[botChoice].className = 'box red'

    console.log(boxes)  

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
      gameType: "bot"
    })
  }

  vsPlayer = () => {
    this.setState({
      gameType: "local"
    })
  }

  vsOnline = () => {
    this.setState({
      gameType: "online"
    })
  }

  restartGame = () => {
    return document.location.reload(true);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.turnNumber];
    const winner = calculateWinner(current.boxes);

    let status;
    if (winner === 'box blue') {
      status = 'Blue wins!';
    } else if (winner === 'box red') {
      status = 'Red wins!';
    } else {
      status = this.state.isRedNext ? 'Blue\'s turn' : 'Red\'s turn';
    }


    // PLAY 'ONLINE' 
    if (this.state.turnNumber >= 0 && this.state.gameType === "online") {
      return (
        <div className="game-container">
          <div>tic-tac-bananas</div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={i => this.handleBotClick(i)}
            gameType={this.state.gameType}
            autoPick={this.autoPick}
            gameOver={this.state.gameOver}
          />
          <br></br>
          <RestartBtnContainer className={'btn'} onClick={this.restartGame} />
          <br></br>
          <UndoBtnContainer onClick={this.goBack} value={this.desc} id='undo-container' key='undo-container' />
        </div>
      )

    // PLAY VS A BOT
     } else if (this.state.turnNumber >= 0 && this.state.gameType === "bot") {
      return (
        <div className="game-container">
          <div>tic-tac-bananas</div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={i => this.handleBotClick(i)}
            gameType={this.state.gameType}
            autoPick={this.autoPick}
            gameOver={this.state.gameOver}
          />
          <br></br>
          <RestartBtnContainer className={'btn'} onClick={this.restartGame} />
          <br></br>
          <UndoBtnContainer onClick={this.goBack} value={this.desc} id='undo-container' key='undo-container' />
        </div>
      )

      // PLAY LOCALLY
    } else if (this.state.turnNumber >= 0 && this.state.gameType === "local") {
      return (
        <div className="game-container">
          <div>🍌 tic-tac-bananas 🍌</div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={i => this.handlePlayerClick(i)}
            gameType={this.state.gameType}
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
            gameType={this.state.gameType}
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
