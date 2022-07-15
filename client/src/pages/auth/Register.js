import React, { useState } from "react";
import app from "../../firebase";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    const auth = getAuth();
    await sendSignInLinkToEmail(auth, email, config)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        toast.success(
          `Email is sent to ${email} .Click the link to complete your registration`
        );
        window.localStorage.setItem("emailForSignIn", email);
        setEmail("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
