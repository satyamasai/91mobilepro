import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      setLoader(true);
      // console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
      let loginData = { email, password };
      axios
        .post("https://nine1mobile-satyam.onrender.com/user/login", loginData)
        .then((res) => {
          localStorage.setItem(
            "userToken",
            JSON.stringify(res.data.document.token)
          );
          setLoader(false);
          navigate("/user/dashboard");
        })
        .catch((err) => {
          setLoader(false);
          alert("Login with correct credentials");
          console.log(err);
        });
    } else {
      alert("please enter correct credintials");
    }
  };

  return (
    <div className="signup-container">
      <form className="login_form" onSubmit={handleSubmit}>
        <label>USER LOG-IN </label>
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password" 
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {loader ? (
          <img
            className="loader"
            src="https://i.gifer.com/origin/d3/d3f472b06590a25cb4372ff289d81711_w200.gif"
            alt="loader"
          />
        ) : (
          <Button colorScheme={"green"} className="login_button" type="submit">
            Log in
          </Button>
        )}
      </form>
    </div>
  );
};

export default UserLogin;
