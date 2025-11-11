const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        ERROR: "Credentials Required",
      });
    }

    const emailPresent = await userModel.findOne(email);

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

    res.cookie("Token", token);

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
      






  } catch (err) {
    res.status(500).json({ ERROR: err.message });
  }
};

const logout = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ ERROR: err.message });
  }
};

module.exports = { signup, login, logout };
