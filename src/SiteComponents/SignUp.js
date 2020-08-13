import React from 'react';
import { Link, withRouter } from 'react-router-dom'

import * as ROUTES from '../constants/routes';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose'

import GoogleButton from 'react-google-button'

const SignUpPage = () => (
  <div className="form-container">
    <h1>Sign Up!</h1>
    <SignUpForm />
  </div>
);
 

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }
 
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({[event.target.name]: event.target.value }); 
  };

  googleSubmit = event => {
    this.props.firebase
      .doGoogleLogin()
      .then(user => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
        console.log(user)
      })
      .catch(error => {
        this.setState({ error });
      });
  }
 
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    
    return (
      <div className="form-container">
      <form onSubmit={this.onSubmit} id="sign-up-form">
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Sign Up</button>
 
        <GoogleButton onClick={this.googleSubmit}/>

        <br></br>

        {error && <p>{error.message}</p>} 
      </form>
      </div>
    );
  }
}

 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
  )(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };