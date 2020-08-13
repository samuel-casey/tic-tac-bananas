
import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import SignOutButton from './SignOut';

export const Navigation = ({ authUser, gameInProgress, toggleGameInProgress }) => {
  if (authUser) {
    return gameInProgress ?
      <div className="auth-nav-container">
        <NavAuthGame toggleGameInProgress={toggleGameInProgress} />
        <SignOutButton />
      </div> : <div className="auth-nav-container">
        <NavAuth toggleGameInProgress={toggleGameInProgress} />
        <SignOutButton />
      </div>
  }
  return gameInProgress ? <div> <NavNonAuthGame toggleGameInProgress={toggleGameInProgress} /> </div> : <div> <NavNonAuth toggleGameInProgress={toggleGameInProgress} /> </div>
}


// authUser !== null, gameInProgress === false
const NavAuth = (props) => {
  return (
    <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
      <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME} onClick={props.toggleGameInProgress}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.PLAY} onClick={props.toggleGameInProgress}>Play</Link>
        </li>
      </ul>
    </div>
  )
}

// authUser === null, gameInProgres === false
const NavNonAuth = (props) => {
  return (
    <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
      <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In/Sign Up</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME} onClick={props.toggleGameInProgress}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.PLAY} onClick={props.toggleGameInProgress}>Play</Link>
        </li>
      </ul>
    </div>
  )
}


// authUser !== null, gameInProgres === true
const NavAuthGame = (props) => {
  return (
    <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
      <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME} onClick={props.toggleGameInProgress}>Home</Link>
        </li>
      </ul>
    </div>
  )
}

// authUser === null, gameInProgress === true
const NavNonAuthGame = (props) => {
  return (
    <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
      <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In/Sign Up</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME} onClick={props.toggleGameInProgress}>Home</Link>
        </li>
      </ul>
    </div>
  )
}