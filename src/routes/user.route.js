import { register, login } from "../controllers/user.controller.js"; 
import express from 'express'

const route = express()

route.post('/user/register', register)
route.post('/user/login', login)

export default route