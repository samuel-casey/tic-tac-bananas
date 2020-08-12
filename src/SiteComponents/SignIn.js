import React from 'react';
import { SignUp } from './SignUp'

export const SignIn = (props) => (
  <div>
    <div className={"activeUser"}>"EMAIL"</div>
    <br></br>
    <button id={"googleLogin"} style={props.style} onClick={props.onClick}>Sign in with Google</button>

    <SignUp />
  </div>
);