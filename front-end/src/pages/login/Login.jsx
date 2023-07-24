import React, { useState } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputField({
      ...inputField,
      [name]: value,
    });
  };
  // console.log(inputField);

  const handleClick = async () => {
    const isError = ValidateData();
    if (isError) {
      return;
    }

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(inputField),
    });

    if (response.status == 404) {
      toast.error("User Not found");
    }

    if (response.status == 403) {
      toast.error("Password not match");
    }

    if (response.status == 200) {
      const auth = await response.json();
      const user = auth.user;
      console.log(user);

      localStorage.setItem("auth", JSON.stringify(user));

      toast.success("login succesfully");

      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  };

  const ValidateData = () => {
    const schema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    const value = schema.validate(inputField);
    const error = value?.error?.message;
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
    if (error) {
      return true;
    }
    return false;
  };

  return (
    <div className={style.container}>
        <ToastContainer />

      <div className={style.inputContainer}>

        <h3>Login</h3>

        <label htmlFor="">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Enter Your Email"
          value={inputField.email}
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <input
          name="password"
          type="text"
          placeholder="Enter Your Password"
          value={inputField.password}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Login</button>
        <Link className={style.linkTag} to={"/signup"}>
          Go to Signup page...
        </Link>
      </div>
    </div>
  );
}

export default Login;
