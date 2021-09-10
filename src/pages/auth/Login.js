import React, { useState } from "react";
// import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  GoogleOutlined,
  MailOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";

//component start
const Login = ({ history }) => {
  //variable declarations
  const [email, setEmail] = useState("rameshrahul26@gmail.com");
  const [password, setPassword] = useState("rahulramesh");
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();

  //event handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log("result=>", result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control my-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter Email"
      />
      <input
        type="password"
        className="form-control my-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
        icon={<MailOutlined />}
        size="large"
      />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<UserAddOutlined />}
        disabled={!email || password < 6}
      >
        Login with Email/ Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            disabled={!email || password < 6}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-end text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
