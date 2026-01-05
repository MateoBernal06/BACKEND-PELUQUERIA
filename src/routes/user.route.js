import { register } from "../controllers/user.controller.js"; 
import express from 'express'

const route = express()

route.post('/user/register', register)


export default route