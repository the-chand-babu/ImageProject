const express = require("express");
const connection = require("./db");
const Signup_Router = require("./Router/Signup");
const Login_Router = require("./Router/login");
const Home_Router = require("./Router/Home.js");
const cors = require("cors");

const favourite_Router  = require("./Router/favourite");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/signup", Signup_Router);
app.use("/login", Login_Router);
app.use("/getImages", Home_Router);
app.use('/favourite',favourite_Router )

app.listen(4000, async () => {
  await connection;
  console.log("Port is listning 4000");
});


module.exports =app