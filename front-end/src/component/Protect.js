import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Protect({ children }) {
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("auth"));
  console.log("hi", auth);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, []);

  if (auth) {
    return children;
  }
}

export default Protect;
