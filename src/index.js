import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom'

const config = {
  apiKey: "AIzaSyDjipWGB6aW0H5x62zFJHuNhwrkzpRO5Sc",
  authDomain: "tic-tac-bananas.firebaseapp.com",
  databaseURL: "https://tic-tac-bananas.firebaseio.com",
  projectId: "tic-tac-bananas",
  storageBucket: "tic-tac-bananas.appspot.com",
  messagingSenderId: "480289553205",
  appId: "1:480289553205:web:c9bd11ad551fec5cbd6a7c"
};


firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

export const handleGoogleLogin = () => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  let token = result.credential.accessToken;
  // The signed-in user info.
  let user = result.user;
  // 
  return user
}).then((user) => {
  // show the logged in user's email
  const activeUserEmail = user.email
  return activeUserEmail
})
.catch(function(error) {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  // The email of the user's account used.
  let email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  let credential = error.credential;
  // ...
});
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
