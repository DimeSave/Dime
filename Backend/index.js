const express = require("express");
const validator = require("validator");

const app = express();
app.use(express.json());
w;
async function signupWithEmail(req, res) {
  const { email, password, address } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email not found" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: "password is empty, please input a password" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "email is not valid" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "password is not strong" });
  }

  const emailToLowerCase = email.toLowerCase();

  return res.json({ message: "Congratulation, Registration complete!!!" });
}

app.post("/home", signupWithEmail);

app.listen(3700, function () {
  console.log("server started on port 3700");
});
