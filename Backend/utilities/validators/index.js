import z from "zod";
import { passwordUtils } from "../helpers.js";

export const userRegisterSchema = z.object({
  firstName: z.string().min(2, "firstname is required"),
  lastName: z.string().min(2, "lastname is required"),
  email: z.string().email({ message: "email is invalid" }),
  phone: z.string().min(11, "phone number is required"),
  password: z.string().min(5, passwordUtils.error),
});
