// import utils
import './index.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { withFirebase } from './Firebase/context';
import { AuthUserContext } from './SiteComponents/Session/index.js'

// import {handleGoogleLogin} from './index.js'

// import fake usernames and csv parser
import * as usernamesCSV from './usernames.csv';
import { readRemoteFile } from 'react-papaparse'

// import Routes
import * as ROUTES from './constants/routes';
import { Home } from './SiteComponents/Home'
import { Landing } from './SiteComponents/Landing'
import { MyAdmin } from './SiteComponents/Admin';
import SignUpPage from './SiteComponents/SignUp';
import { SignInPage } from './SiteComponents/SignIn';
import { AccountPage } from './SiteComponents/Account';
import { Play } from './SiteComponents/Play';
import { PasswordForgetPage } from './SiteComponents/PasswordForget';


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
      gameInProgress: false
    };
    this.toggleGameInProgress = this.toggleGameInProgress.bind(this)
  }

  toggleGameInProgress() {
    this.setState((state, props) => ({
      gameInProgress: !state.gameInProgress
    }))
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
      <div>
        <AuthUserContext.Provider value={this.state.authUser}>
          <Router>
            <div>
              <Route path={ROUTES.LANDING}>
                <Landing authUser={this.state.authUser} gameInProgress={this.state.gameInProgress} toggleGameInProgress={this.state.toggleGameInProgress}/>
              </Route>
              <Route path={ROUTES.HOME}>
                <Home />
              </Route>
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN}>
                <SignInPage style={{ "color": "red" }} />
              </Route>
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route path={ROUTES.PLAY}>
                <Play isLoggedIn={this.state.isLoggedIn} />
              </Route>
              <Route path={ROUTES.ACCOUNT}  >
                <AccountPage authUser={this.state.authUser}/>
              </Route>
              <Route path={ROUTES.MY_ADMIN} component={MyAdmin} />
            </div>
          </Router>
        </AuthUserContext.Provider>
      </div>
    )
  }
}


export default withFirebase(App)