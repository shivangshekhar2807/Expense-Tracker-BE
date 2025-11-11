const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        ERROR: "Credentials Required",
      });
    }

    const emailPresent = await userModel.findOne({email});

    if (emailPresent) {
      return res.status(400).json({
        ERROR: `User with email ${email} Allready exist.`,
      });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      phone,
      password: hassedPassword,
    });

    const token = await jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

      res.cookie("Token", token, {
        maxAge: 3600000,
      });

    res.status(201).json({
      Message: "User Added Successfully",
      Data: newUser,
    });
  } catch (err) {
    res.status(500).json({ ERROR: err.message });
  }
};

const login = async (req, res) => {
    try {
       
        const { email, password } = req.body;

        if (!email || !password) {
             return res.status(400).json({
               ERROR: "Credentials Required",
             });
        }
        
       

        const emailPresent = await userModel.findOne({email})
        
        if (!emailPresent) {
             return res.status(400).json({
               ERROR: `User with email ${email} does not exist.`,
             });
        }
        
        

        const hassPassword = await bcrypt.compare(
          password,
          emailPresent.password
        );

        

        if (!hassPassword) {
            return res.status(400).json({
              ERROR: `Incorrect Password`,
            });
        }

       

        const token = await jwt.sign(
          {
            id: emailPresent.id,
          },
            process.env.JWT_SECRET,
            {
              expiresIn:"1h"
          }
        );
       
        res.cookie("Token", token, {
          maxAge: 3600000,
        });


      

        res.status(201).json({
            Message: "Login Successfull",
            Data:emailPresent
        })
        
    } catch (err) {
    res.status(500).json({ ERROR: err.message });
  }
};

const logout = async (req, res) => {
    try {
      res.cookie("Token", null, {
    expires: new Date(Date.now()),
  });
  res.status(201).json({
    status: "LOGOUT SUCCESSFULL",
  });
  } catch (err) {
    res.status(500).json({ ERROR: err.message });
  }
};

module.exports = { signup, login, logout };
