
import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

export const Navigation = (props) => {
  console.log("isLoggedIn")
  console.log(props.isLoggedIn)
  console.log("gameInProgress")
  console.log(props.gameInProgress)
  if (props.isLoggedIn === true && props.gameInProgress === false) {
    return (
      <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
        <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
          <li>
            <Link to={ROUTES.SIGN_OUT}>Sign Out</Link>
          </li>
          <li>
            <Link to={ROUTES.PLAY} onClick={props.toggleGameInProgress}>Play</Link>
          </li>
          <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </li>
        </ul>
      </div>
    )
  } else if (props.isLoggedIn === false && props.gameInProgress === false) {
    return (
      <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
        <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In/Sign Up</Link>
          </li>
          <li>
            <Link to={ROUTES.PLAY}>Play</Link>
          </li>
        </ul>
      </div>
    )
  } else if (props.isLoggedIn === true && props.gameInProgress === true) {
    return (
      <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
        <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In/Sign Up</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </li>
        </ul>
      </div>
    )
  } else if (props.isLoggedIn === false && props.gameInProgress === true) {
    return (
      <div style={{ "display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center" }}>
        <ul style={{ "display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none" }}>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In/Sign Up</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
        </ul>
      </div>
    )
  }
  };
