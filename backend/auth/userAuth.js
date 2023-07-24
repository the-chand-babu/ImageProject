const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const userAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];
  console.log("token", token);
  var decoded = jwt.verify(token, "shhhhh");

  if (!decoded) {
    return res.status(401).json({ message: "User are not Authorized" });
  }
  const { userId } = decoded;

  const isUser = await UserModel.findOne({ _id: userId });
  if (!isUser) {
    return res.status(401).json({ message: "User are not Authorized" });
  }

  next();
};

module.exports = userAuth;
