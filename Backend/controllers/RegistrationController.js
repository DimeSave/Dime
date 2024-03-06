const userModels = require("../models/UserModel");
const { Op } = require("sequelize");
const validator = require("validator");
const { isAddress } = require("ethers");

async function signupWithEmailAndAddress(req, res) {
  try {
    const { email, password, address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "address not found" });
    }

    if (!isAddress(address)) {
      return res
        .status(400)
        .json({ message: "address is not valid, enter a valid address" });
    }

    if (!email) {
      return res.status(400).json({ message: "email not found" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "email is not valid" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "password is empty, please input a password" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "password is not strong" });
    }

    const emailToLowercase = email.toLowerCase();
    const addressToLowercase = address.toLowerCase();

    const user = await userModels.findOne({
      where: {
        [Op.or]: [
          {
            email: emailToLowercase,
            address: addressToLowercase,
          },
        ],
      },
    });

    if (user) {
      return res.status(401).json({ message: "email or address already used" });
    }

    const newUser = await userModels.create({
      email: emailToLowercase,
      address: addressToLowercase,
      password,
    });

    await newUser.save();

    return res.json({ message: "Congratulation, Registration complete!!!" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

module.exports = signupWithEmailAndAddress;
