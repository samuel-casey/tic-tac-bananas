import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';

import GoogleButton from 'react-google-button'

export const SignInPage = (props) => (
  <div className="form-container">
    <h4>Sign In Below</h4>
    <br></br>

    <SignInForm />

    <br></br>

    <SignUpLink />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.loginError = this.loginError.bind(this)
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleGoogleLogin = (history) => {
    this.props.firebase
      .doGoogleLogin()
      .then(() => {
        this.props.history.push(ROUTES.HOME)
      })
  }

  loginError(error) {
    let loginError;
    if (error !== null) {
      switch (error.message) {
        case "The password is invalid or the user does not have a password.":
          return loginError = "The password is invalid or the user does not have a password. If you are attempting to login with a gmail account, please use the 'Sign in with Google' button below";
        case "There is no user record corresponding to this identifier. The user may have been deleted.":
          return loginError = "This email is not on file. Please use the sign up link at the bottom of the page."
        default:
          return loginError = error.message;
      }
    }
  }

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';


    return (
      <div className="form-container">
        <form onSubmit={this.onSubmit} id="sign-in-form">
          <label>Email:</label>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <label>Password:</label>
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
        </button>
          {this.loginError(error)}
          <PasswordForgetLink />
          <br></br>
          <GoogleButton className="google-login" onClick={() => { this.handleGoogleLogin() }} />
        </form>
      </div>

    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
