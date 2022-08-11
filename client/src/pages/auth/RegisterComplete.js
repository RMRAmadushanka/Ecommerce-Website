import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  getAuth,
  getIdTokenResult,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { createOrUpdateUser } from "../../publicFucntions/auth";




const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user} = useSelector((state)=>({...state}))
  let dispatch = useDispatch()
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      
      // The client SDK will parse the code from the link for you.
       signInWithEmailLink (auth, email, window.location.href, password)
        .then((result) => {
          
          if (result.user.emailVerified) {
            // Clear email from storage.
    
            const user = auth.currentUser;
             updatePassword (user, password).then(async() => {
              // Update successful.
              window.localStorage.removeItem('emailForSignIn');
              const idTokenResult = await user.getIdTokenResult()
              createOrUpdateUser(idTokenResult.token)
     .then(res=>
       dispatch({
         type:'LOGGED_IN_USER',
         payload:{
           name:res.data.name,
           email:res.data.email,
           token:idTokenResult.token,
           role:res.data.role,
           _id:res.data.id
         }
       }))
     .catch(err=>console.log(err))
              navigate("/");
            }).catch((error) => {
            console.log(error);
            });
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const CompleteRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        disabled
        autoFocus
        placeholder="password"
      />
      <br />
      <input
        type="text"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          {CompleteRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
