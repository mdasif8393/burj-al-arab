import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    //facebook login

    const handleFbSignIn = () =>{
      var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
    }

    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
            var {displayName, email} = result.user;
            const signInUser = {name: displayName, email};
            setLoggedInUser(signInUser);
            history.replace(from);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google login</button><br/>
            <button onClick={handleFbSignIn}>Facebook Login</button>
        </div>
    );
};

export default Login;