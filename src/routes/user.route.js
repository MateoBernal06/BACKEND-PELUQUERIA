import { register, login } from "../controllers/user.controller.js"; 
import express from 'express'
import verifyIdentity from "../middlewares/verifyToken.js";

const route = express()

route.post('/user/register', verifyIdentity, register)
route.post('/user/login', login)

export default route