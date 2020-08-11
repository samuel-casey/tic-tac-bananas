// import utils
import './index.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

// // import Game components
// import { GameBoard } from './GameComponents/GameBoard';
// import { UndoBtnContainer } from './Containers/UndoBtnContainer';
// import { StartMenu } from './Containers/StartMenu.js';
// import { RestartBtnContainer } from './Containers/RestartBtnContainer.js';
// import { OpponentContainer } from './Containers/OpponentContainer.js';

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
import {SignOut} from './SiteComponents/SignOut'


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

    // TURN THIS INTO MOBX //
    this.state = {
      isLoggedIn: true,
      gameInProgress: false
    }
    this.toggleGameInProgress = this.toggleGameInProgress.bind(this)
  }

  toggleGameInProgress() {
    this.setState((state,props) => ({
      gameInProgress: !state.gameInProgress
    }));
  }

  render() {
      return (
        <div>
          <Router>
            <div>
              <Route path={ROUTES.HOME}>
                <Home isLoggedIn={this.state.isLoggedIn} toggleGameInProgress={this.toggleGameInProgress}/>
              </Route>
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.SIGN_OUT} component={SignOut} />
              <Route path={ROUTES.SIGN_IN}>
                <SignIn style={{ "color": "red" }} />
              </Route>
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
              <Route path={ROUTES.PLAY}>
                <Play isLoggedIn={this.state.isLoggedIn} />
              </Route>
              <Route path={ROUTES.ACCOUNT} component={Account} />
              <Route path={ROUTES.ADMIN} component={Admin} />
            </div>
          </Router>
        </div>
      )
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
