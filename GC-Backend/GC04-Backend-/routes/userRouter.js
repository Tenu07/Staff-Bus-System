import express from 'express';
import { creatAdmin, createCustomer, getAllUsers, getUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",creatAdmin)
userRouter.post("/signup",createCustomer)
userRouter.post("/login",loginUser)
userRouter.get("/",getAllUsers)
userRouter.get("/user",getUser)




export default userRouter;