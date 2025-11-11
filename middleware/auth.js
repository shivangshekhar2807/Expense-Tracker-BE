const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");


const Auth = async (req, res, next) => {
  try {
   const cookies = req.cookies;
   const { Token } = cookies;

      if (!Token) {
         return res.status(401).send("Please Login");
      }
      
      const decoded = await jwt.verify(Token, process.env.JWT_SECRET);

      const { id } = decoded;

      const user = await userModel.findByPk(id);

      if (!user) {
        throw new Error("USER NOT FOUND");
      }

      req.user = user;

      next();


  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
  }
};

module.exports = {Auth};
