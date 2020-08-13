import * as app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as ROUTES from '../constants/routes';

const config = {
    apiKey: "AIzaSyDjipWGB6aW0H5x62zFJHuNhwrkzpRO5Sc",
    authDomain: "tic-tac-bananas.firebaseapp.com",
    databaseURL: "https://tic-tac-bananas.firebaseio.com",
    projectId: "tic-tac-bananas",
    storageBucket: "tic-tac-bananas.appspot.com",
    messagingSenderId: "480289553205",
    appId: "1:480289553205:web:c9bd11ad551fec5cbd6a7c"
};


class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    google = new app.auth.GoogleAuthProvider();
    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doGoogleLogin = () => {
        this.auth.signInWithPopup(this.google).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // ...
        }).then((user) => {
            console.log(user)
            this.props.history.push(ROUTES.HOME)
        })
        .catch(function (error) {
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

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;