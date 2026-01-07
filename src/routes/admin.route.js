
import { login,register } from "../controllers/admin.controller.js";
import express from 'express'

const route = express()

route.post('/admin/login', login)
route.post('/admin/register', register)

export default route