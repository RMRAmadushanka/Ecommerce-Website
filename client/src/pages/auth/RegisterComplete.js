import React, { useState, useEffect } from "react";
import app from "../../firebase";
import {
  getAuth,
  getIdTokenResult,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
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
      signInWithEmailLink(auth, email, window.location.href, password)
        .then((result) => {
          if (result.user.emailVerified) {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");

            const idTokenResult = result.user.getIdTokenResult();
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
            console.log(idTokenResult);
            navigate("/");
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
