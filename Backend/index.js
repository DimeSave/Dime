const express = require("express");
const database = require("./database");
const dotenv = require("dotenv");
const signupWithEmailAndAddress = require("./controllers/RegistrationController");
const { loginWithEmailController } = require("./controllers/loginwithemail");

dotenv.config();

const app = express();
app.use(express.json());

app.post("/register", signupWithEmailAndAddress);
app.post("/login", loginWithEmailController);

app.listen(3700, function () {
  console.log("server started on port 3700");
  database.sync(function () {
    console.log("database started recording:");
  });
});
