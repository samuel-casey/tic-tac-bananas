import React from 'react';
import { Link } from 'react-router-dom'

import * as ROUTES from '../constants/routes';

export const SignUp = () => (
  <div>
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

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {... INITIAL_STATE};
  }
 
  onSubmit = event => {
 
  }
 
  onChange = event => {
 
  };
 
  render() {
    return (
      <form onSubmit={this.onSubmit}>
 
      </form>
    );
  }
}
 
export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
