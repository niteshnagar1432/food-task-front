import React, { useEffect, useState } from "react";

import "../css/login.css";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken } from "../redux/cartReducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.cart.token);
  const localToken = localStorage.getItem("token");
  useEffect(() => {
    if (token || localToken) {
      dispatch(setToken(localToken || token));
      navigate("/home");
    }
  }, [token, localToken]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const handleRegister = async () => {
    if (!name) {
      return toast.error("Please enter your name");
    }
    if (!email) {
      return toast.warn("Please Enter Email Address.");
    }
    if (!password) {
      return toast.warn("Please Enter Password.");
    }

    try {
      setBtnLoading(true);
      let res = await axios.post("http://127.0.0.1:4001/api/user/sign-up", {
        name,
        email,
        password,
      });

      let { status, message, data } = res.data || res;
      if (status) {
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBtnLoading(false);
    }
  };
  return (
    <>
      <Header isNotVisible={true} />
      <div className="login-area">
        <div className="login-area-semi">
          <h3 style={{ marginBottom: "10px" }}>Sign-Up</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Please Enter Full Name."
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Please Enter Email Address."
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Please Enter Password."
          />
          <p>
            already have account <Link to={"/"}>sign-in</Link>
          </p>
          <button onClick={handleRegister} disabled={btnLoading} type="button">
            {btnLoading ? "Loading..." : "Sign-Up"}
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
