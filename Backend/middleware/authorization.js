import { req, res, next } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/env";
import { HTTP_STATUS_CODE } from "../constants/httpStatusCode.js";

export const auth = async () => {
  try {
    
    const token = req.headers.authorization;
    if (token === undefined || token === null) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
        status: "There is an Error",
        message: "Ensure that you are logged in",
      });
    }

    const pin = token.split(" ")[1];
  

    if (!pin || pin === "") {
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).send({
        status: "Error",
        message: "The pin can't be used",
      });
    }
    const decoded = jwt.verify(pin, `${APP_SECRET}`);
    req.user = decoded;
    

    return next();
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send({
      status: "Error",
      message: err,
    });
  }
};
