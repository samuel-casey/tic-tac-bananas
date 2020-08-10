// import utils
import './index.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

// import Game components
import { GameBoard } from './GameComponents/GameBoard';
import { UndoBtnContainer } from './Containers/UndoBtnContainer';
import { StartMenu } from './Containers/StartMenu.js';
import { RestartBtnContainer } from './Containers/RestartBtnContainer.js';
import { OpponentContainer } from './Containers/OpponentContainer.js';

// import fake usernames and csv parser
import * as usernamesCSV from './usernames.csv';
import { readRemoteFile } from 'react-papaparse'

// import Routes
import * as ROUTES from './constants/routes';
import { Home } from './SiteComponents/Home'
import { Admin } from './SiteComponents/Admin';
import { Navigation } from './SiteComponents/Navigation';
import { SignUp } from './SiteComponents/SignUp';
import { SignIn } from './SiteComponents/SignIn';
import { PasswordForget } from './SiteComponents/PasswordForget';
import { Account } from './SiteComponents/Account';
import { Play } from './SiteComponents/Play';


const usernames = []

readRemoteFile(usernamesCSV, {
  step: (row) => {
    if (row !== 0) {
      usernames.push(row.data[1])
    }
  }
})

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
      gameOver: false,
      opponent: null
    }
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.goBack = this.goBack.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.vsBot = this.vsBot.bind(this)
    this.vsPlayer = this.vsPlayer.bind(this)
    this.autoPick = this.autoPick.bind(this)
    this.vsOnline = this.vsOnline.bind(this)
    this.chooseOpponent = this.chooseOpponent.bind(this)
    this.onlinePick = this.onlinePick.bind(this)
  }

  handlePlayerClick = (i) => {

    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[history.length - 1];
    const boxes = current.boxes.slice();

    if (calculateWinner(boxes) || boxes[i].isFull === true) {
      return;
    }

    const next = this.state.isRedNext

    next ? boxes[i] = { value: <span role="img" aria-label="banana">🍌</span>, isFull: true, fromTurn: this.state.turnNumber, className: 'box blue', boxNo: Number(i) } : boxes[i] = { value: <span role="img" aria-label="banana">🍌</span>, isFull: true, fromTurn: this.state.turnNumber, className: 'box red', boxNo: Number(i) }

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

    boxes[i] = { value: <span role="img" aria-label="banana">🍌</span>, isFull: true, fromTurn: this.state.turnNumber, className: 'box blue', boxNo: Number(i) }

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

  onlinePick = () => {

    const delays = [2500, 3500, 4500, 6000]
    const delayIdx = Math.floor(Math.random() * delays.length)
    const delay = delays[delayIdx]

    setTimeout(() => {
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
        if (box.isFull === true) {
          filledBoxes.push(box)
        } else {
          emptyBoxes.push(box)
        }
      })

      let randBoxNum = Math.floor(Math.random() * emptyBoxes.length)

      let botChoice = emptyBoxes[randBoxNum].boxNo

      const newBox = { value: <span role="img" aria-label="banana">🍌</span>, isFull: true, fromTurn: this.state.turnNumber, className: 'box red', boxNo: boxes[botChoice].boxNo }

      boxes[botChoice] = newBox

      this.setState({
        history: history.concat([
          {
            boxes: boxes,
          }
        ]),
        isRedNext: !next,
        turnNumber: history.length
      })
    }, delay)
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
      if (box.isFull === true) {
        filledBoxes.push(box)
      } else {
        emptyBoxes.push(box)
      }
    })

    let randBoxNum = Math.floor(Math.random() * emptyBoxes.length)

    let botChoice = emptyBoxes[randBoxNum].boxNo

    const newBox = { value: <span role="img" aria-label="banana">🍌</span>, isFull: true, fromTurn: this.state.turnNumber, className: 'box red', boxNo: boxes[botChoice].boxNo }

    boxes[botChoice] = newBox

    console.log('---')
    console.log(next)
    console.log('---')


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

  goBack = () => {

    if (this.state.turnNumber === 0) {
      this.restartGame()
    } else {
      this.setState({
        turnNumber: this.state.turnNumber - 1,
        isRedNext: !this.state.isRedNext
      })
    }
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

  chooseOpponent = () => {
    const idx = Math.floor(Math.random() * usernames.length)
    return usernames[idx]
  }

  vsOnline = () => {
    const newOpp = this.chooseOpponent()
    console.log('Online connected')
    this.setState({
      gameType: "online"
    })

    this.setState({
      opponent: null
    })

    setTimeout(() => {
      this.setState({
        opponent: newOpp
      })
    }, 2000)
  }

  restartGame = () => {
    return window.location.reload(true);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.turnNumber];
    const winner = calculateWinner(current.boxes);

    let status;
    if (winner === 'box blue') {
      status = <p>Blue wins!</p>;
    } else if (winner === 'box red') {
      status = <p>Red wins!</p>;
    } else if (winner === 'Draw') {
      status = <p>It's a draw!</p>
    } else {
      status = this.state.isRedNext ? <p style={{ "background": "rgba(0,0,255,.3)" }}>Blue's turn</p> : <p style={{ "background": "rgba(255,0,0,.3)" }}>Red's turn</p>;
    }

    // PLAY 'ONLINE' 
    if (this.state.turnNumber >= 0 && this.state.gameType === "online") {
      const oppUserName = this.state.opponent
      return (
        <div className="game-container">
          <Navigation />
          <div><span role="img" aria-label="banana">🍌</span> tic-tac-bananas <span role="img" aria-label="banana">🍌</span></div>
          <div>~online~</div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={i => this.handleBotClick(i)}
            gameType={this.state.gameType}
            onlinePick={this.onlinePick}
            gameOver={this.state.gameOver}
          />
          <br></br>
          <RestartBtnContainer className={'btn'} value={"Quit and return to Menu"} onClick={this.restartGame} />
          <br></br>
          <br></br>
          <div style={{ "textEmphasis": "bold" }}>Playing against:</div>
          <OpponentContainer className={'opponent'} id={'opponent'} value={oppUserName} />
        </div>
      )
      // PLAY VS A BOT
    } else if (this.state.turnNumber >= 0 && this.state.gameType === "bot") {
      return (
        <div className="game-container">
          <Navigation />
          <div><span role="img" aria-label="banana">🍌</span>tic-tac-bananas<span role="img" aria-label="banana">🍌</span></div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history}
            boxes={current.boxes}
            onClick={i => this.handleBotClick(i)}
            gameType={this.state.gameType}
            autoPick={this.autoPick}
            isRedNext={this.state.isRedNext}
            gameOver={this.state.gameOver}
          />
          <br></br>
          <RestartBtnContainer className={'btn'} onClick={this.restartGame} value={"Restart Game"} />
          <br></br>
          <UndoBtnContainer onClick={this.goBack} value={this.desc} id='undo-container' key='undo-container' />
        </div>
      )

      // PLAY LOCALLY
    } else if (this.state.turnNumber >= 0 && this.state.gameType === "local") {
      return (
        <div className="game-container">
          <Navigation />
          <div><span role="img" aria-label="banana">🍌</span> tic-tac-bananas <span role="img" aria-label="banana">🍌</span></div>
          <div className="instructions">{status}</div>
          <GameBoard
            history={history.boxes}
            boxes={current.boxes}
            onClick={i => this.handlePlayerClick(i)}
            gameOver={this.state.gameOver}
            gameType={this.state.gameType}
          />
          <br></br>
          <RestartBtnContainer className={'btn'} onClick={this.restartGame} value={"Restart Game"} />
          <br></br>
          <UndoBtnContainer onClick={this.goBack} value={this.desc} id='undo-container' key='undo-container' />
        </div>
      )
    } else {
      return (
        <div>
          <Router>
            <div>
              <Route path={ROUTES.HOME} component={Home} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.SIGN_IN}>
                <SignIn style={{ "color": "red" }} />
              </Route>
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
              <Route path={ROUTES.PLAY}>
                <StartMenu botCallback={this.vsBot} playerCallback={this.vsPlayer} onlineCallback={this.vsOnline} />
                <GameBoard
                  history={history.boxes}
                  boxes={current.boxes}
                  onClick={i => this.handlePlayerClick(i)}
                  gameOver={this.state.gameOver}
                  gameType={this.state.gameType}
                />
              </Route>
              <Route path={ROUTES.ACCOUNT} component={Account} />
              <Route path={ROUTES.ADMIN} component={Admin} />
              <hr />
              <Navigation />
            </div>
          </Router>
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

  let fullBoxCount = 0

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    //CHECK WIN
    if (boxes[a].className !== 'box ' && boxes[a].className === boxes[b].className && boxes[a].className === boxes[c].className) {
      return boxes[a].className;
    }
  }

  //CHECK DRAW
  for (let box of boxes) {
    if (box.isFull === true) {
      fullBoxCount += 1
    }
  }

  if (fullBoxCount === 9) {
    return 'Draw'
  }
  return null;
}

export default App
