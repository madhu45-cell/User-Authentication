import express from "express"
import userAuth from "../middleware/userAuth.js";
import { getUserDate } from "../controller/userController.js";


const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserDate);

export default userRouter;