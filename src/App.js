// import utils
import './index.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

// import {handleGoogleLogin} from './index.js'

// import fake usernames and csv parser
import * as usernamesCSV from './usernames.csv';
import { readRemoteFile } from 'react-papaparse'

// import Routes
import * as ROUTES from './constants/routes';
import { Home } from './SiteComponents/Home'
import { MyAdmin } from './SiteComponents/Admin';
import SignUpPage from './SiteComponents/SignUp';
import { SignInPage } from './SiteComponents/SignIn';
import { PasswordForget } from './SiteComponents/PasswordForget';
import { Account } from './SiteComponents/Account';
import { Play } from './SiteComponents/Play';
import { SignOut } from './SiteComponents/SignOut'


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

    // TURN THIS INTO MOBX //
    this.state = {
      authUser: null,
      gameInProgress: false,
      isLoggedIn: false
    };
    this.toggleGameInProgress = this.toggleGameInProgress.bind(this)
  }

  toggleGameInProgress() {
    this.setState((state,props) => ({
      gameInProgress: !state.gameInProgress
    }))
  }

    render() {
    return (
      <div>
        <Router>
          <div>
            <Route path={ROUTES.HOME}>
              <Home isLoggedIn={this.state.isLoggedIn} gameInProgress={this.state.gameInProgress} toggleGameInProgress={this.toggleGameInProgress}/>
            </Route>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_OUT} component={SignOut} />
            <Route path={ROUTES.SIGN_IN}>
              <SignInPage style={{ "color": "red" }}/>
            </Route>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
            <Route path={ROUTES.PLAY}>
              <Play isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <Route path={ROUTES.ACCOUNT} component={Account} />
            <Route path={ROUTES.MY_ADMIN} component={MyAdmin} />
          </div>
        </Router>
      </div>
    )
  }
}


export default App