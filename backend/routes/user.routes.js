import { Router } from "express";
import { handleGetAllUser, handleGetUserDetails, handleUserLogin, handleUserRegister } from "../controllers/user.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
import authMiddleware from "../middlewares/auth.js";


const userRouter = Router()


userRouter.post("/register" , handleUserRegister)
userRouter.post("/login" , handleUserLogin)
userRouter.get("/get-user-details" ,authMiddleware ,  handleGetUserDetails)
userRouter.get("/get-all-users" , isAdmin , handleGetAllUser)


export default userRouter