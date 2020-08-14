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
    .then((result) => {
      console.log(result)
      this.props.history.push(ROUTES.HOME)
    })
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

          {error && <p>{error.message}</p>}
        </form>
        <br></br>
        <GoogleButton className="google-login" onClick={() => {this.handleGoogleLogin()}} />
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
