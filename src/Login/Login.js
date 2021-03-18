// import logo from './logo.svg';
// import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { UserContext } from "../App";
import { useHistory, useLocation } from "react-router";

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

function Login() {
  const[loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
 
  const { register, handleSubmit, watch, errors } = useForm();
  const [newUser,setNewUser] = useState(false);

  const [user,setUser] = useState({ 
    name : '',
    email:'',
    password:'',
    error:'',
    message:false,
   })

   const fbProvider = new firebase.auth.FacebookAuthProvider();

   const handleFbSignIN = ()=>{
          firebase
          .auth()
          .signInWithPopup(fbProvider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
        
            // The signed-in user info.
            var user = result.user;
            console.log(user);

        
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;
        
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        
            // ...
          });
   }

  const onSubmit = data => {
  //  const newUserInfo = {...user};
    setUser(data);

    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log(user);
          const newUser = {...user};
          newUser.message= true;
          newUser.error = '';
          setUser(newUser)
          // ...
        })
        .catch((error) => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // console.log(errorCode,errorMessage);

          const newUser = {...user};
          newUser.message = false;
          newUser.error = error.message;
          setUser(newUser)
          // ..
        });
    }

    if(!newUser && user.email && user.password){

      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        
        const newUser = {...user};
        newUser.message= true;
          newUser.error = '';
          setUser(newUser);
          setLoggedInUser(newUser);
          history.replace(from);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        const newUser = {...user};
        newUser.message= false;
        newUser.error = errorMessage;
        setUser(newUser)
      });
    }
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div>
      <input onClick={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
      <label htmlFor="newUser">Register</label>

      <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>
 
    {newUser && <input name ="name" ref={register({ required: true, })} placeholder="Name"/>} <br/>

    {errors.name && <span className="error">Name field is required</span>}<br/>

    <input name="email" ref={register({ required: true,pattern:  /\S+@\S+\.\S+/  })} placeholder="email"/><br/>

    {errors.email && <span className="error">Email field is required</span>}<br/>

    <input type="password" name="password" ref={register({ required: true,pattern: /\d{1}/ })} placeholder="Password"/><br/>

    {errors.password && <span style={{color:'red'}}>Minimum 1 number field is required</span>}<br/>
    
    <input type="submit" value={newUser ? 'Sign-up':'Sign-in'}/>
    </form>

    <button onClick={handleFbSignIN}>Sign in with facebook</button>

    <p>{user.name}</p>
    <p>{user.error}</p>
 
      {
        user.message && <p> User {newUser? 'created':'logged in' } successfully </p>
      }  
    

    </div>

  );
}

export default Login;
