import {Router} from "express";
import { userForgotPassword, loginUser, registerUser, userResetPassword, verifyUser, getUser, getAllUsers } from "../controllers/userControllers/index.js";
// import {auth} from "../middleware/authorization.js"

const userRoutes = Router();

userRoutes.post("/registeruser", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/forgotPassword", userForgotPassword);
userRoutes.post("/resetPassword", userResetPassword);
userRoutes.post("/verifyEmail", verifyUser);
userRoutes.get("/getUser", getUser);
userRoutes.get("/getAllUsers", getAllUsers);

export default userRoutes;
