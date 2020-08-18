import * as app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import * as ROUTES from '../constants/routes';

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
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                return result.user.updateProfile({
                    displayName: document.getElementById('displayName').value
                })
            });

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doUpdateDisplayName = (newDisplayName) => {
        return this.auth.currentUser.updateProfile({
            displayName: newDisplayName
        })
    }


doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
.then((email) => {
    console.log(`fb email ${email}`)
    document.getElementById('confirm-email').value = email;
});

doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

doGoogleLogin = () => {
    return this
        .auth
        .signInWithPopup(this.google)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            console.log(error)
            // ...
        });
}



// *** User API ***

user = uid => this.db.ref(`users/${uid}`);

users = () => this.db.ref('users');
}

export default Firebase;