import express from 'express'
import morgan from 'morgan'
import connectionDataBase from './database/database.js'; 
import Usuarios from './routes/user.route.js'
import Administrador from './routes/admin.route.js'
import 'dotenv/config';
import 'colors'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
connectionDataBase()

const PORT = process.env.PORT

app.get('/', (req, res)=>{
    res.send('Server OK')
})

app.use('/api/v1', Usuarios)
app.use('/api/v1', Administrador)

app.use((req, res, next)=>{
    res.status(404).json({
        msg: "Error 404 Not Found"
    });
    next()
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`.bgGreen)
})
