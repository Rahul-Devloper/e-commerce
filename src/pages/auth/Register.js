import React, { useState } from "react";
// import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("env=>", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      // This must be true.
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email has been send to ${email}. Click the link to complete registration.`
    );
    //save user mail in local storage
    window.localStorage.setItem("emailForRegistration", email);
    //clear state
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter Email"
      />
      <button type="submit" className="btn btn-outline-primary btn-rounded m-1">
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
