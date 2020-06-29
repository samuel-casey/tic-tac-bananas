import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDjipWGB6aW0H5x62zFJHuNhwrkzpRO5Sc",
  authDomain: "tic-tac-bananas.firebaseapp.com",
  databaseURL: "https://tic-tac-bananas.firebaseio.com",
  projectId: "tic-tac-bananas",
  storageBucket: "tic-tac-bananas.appspot.com",
  messagingSenderId: "480289553205",
  appId: "1:480289553205:web:c9bd11ad551fec5cbd6a7c"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
