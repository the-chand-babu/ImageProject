import React, { useState } from "react";
import style from "./Signup.module.css";
import { Link } from "react-router-dom";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'



function Signup() {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

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

    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(inputField),
    });

    if(response.status== 201){
      toast.success("Signup Succesfully");
      setTimeout(()=>{
        navigate('/login')
      },2000)
    }

    if(response.status == 403){
      toast.error("User already Present Please Login");
      setTimeout(()=>{
        navigate('/login')
      },2000)
    }
  };

  const ValidateData = () => {
    const schema = Joi.object({
      name: Joi.string().required(),

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

        <h3>SignUp</h3>

        <label htmlFor="">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter Your Name"
          value={inputField.name}
          onChange={handleChange}
        />
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
        <button onClick={handleClick}>signup</button>
        <Link className={style.linkTag} to={"/login"}>
          Go to Login page...
        </Link>
      </div>
    </div>
  );
}

export default Signup;
