  
import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

export const Navigation = () => (
  <div style={{"display": "flex", "alignItems": "middle", "width": "50vw", "alignSelf": "center", "justifyContent": "center"}}>
    <ul style={{"display": "flex", "alignItems": "middle", "justifyContent": "space-around", "padding": "0", "width": "inherit", "listStyle": "none"}}>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In/Sign Up</Link>
      </li>
      <li>
        <Link to={ROUTES.PLAY}>Play</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
    </ul>
  </div>
);