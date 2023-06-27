import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import "./signin.css";

const Signin = () => {
  const name = "SIGN IN";
  const navigate = useNavigate();

  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  let post = async (body) => {
    try {
      const response = await fetch(
        "https://adorable-puce-quail.cyclic.app/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // .then((response) => response.json())
      // .then((rep) => {
      const rep = await response.json();
      console.log(rep.message); // Handle the response as per your application's requirements
      toast.success(rep.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        theme: "colored",
      });
      if (response.ok) {
        navigate("/dashboard");
      }
      // alert(rep.message);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    if (data.Email.trim() === "") {
      return toast.error("please fill all information", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: false,
        theme: "colored",
      });
    } else if (data.Password.trim() === "") {
      return toast.error("please fill all information", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: false,
        theme: "colored",
      });
    }
    setData({
      Email: "",
      Password: "",
    });
    post(data);
    console.log(data);
    console.log("hello");
  };
  return (
    <div>
      <div className="Signin-container">
        <div className="Signin-container-two">
          <div className="Signin-content-two">
            <h1>SIGN IN</h1>
            <input
              type="email"
              placeholder="Email "
              name="Email"
              value={data.Email}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="Password"
              value={data.Password}
              onChange={handleChange}
            />
            <br />
            <div className="check-container">
              {/* <div className="check">
                <input type="checkbox" name="agree" id="check" />
                <label>Remember me</label>
              </div> */}
              <div className="forget">
                <a href="g">Forgot Password?</a>
              </div>
            </div>
            <input
              type="submit"
              value={name}
              id="Signin-btn"
              onClick={handleSubmits}
            />
          </div>
        </div>
        <div className="Signin-container-one">
          <div className="Signin-content-one">
            <h1>Welcome back!</h1>
            <p>
              To keep connected with us please Sign in with your personal info.
            </p>
            <a href="./signup.js">SIGN UP</a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
