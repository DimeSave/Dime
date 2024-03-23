import { Router } from "express";
import userRoutes from "./users.js";

const route = Router();

route.use('/users', userRoutes)

export default route;
