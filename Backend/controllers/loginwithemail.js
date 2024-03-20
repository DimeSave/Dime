const validator = require("validator");
const userModels = require("../models/UserModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

async function loginWithEmailController(req, res) {
  console.log("hello");

  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email not found" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "email is not valid" });
    }

    if (!password) {
      return res.status(400).json({ message: "empty password" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "enter a strong password" });
    }

    const userToLowerCase = email.toLowerCase();

    const user = await userModels.findOne({
      where: {
        email: userToLowerCase,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, address: user.address },
      process.env.SECRET
    );

    return res.status(200).json({ message: "Login successfully!!!" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

module.exports = { loginWithEmailController };
