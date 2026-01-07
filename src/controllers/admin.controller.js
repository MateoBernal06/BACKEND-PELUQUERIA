import Administrador from "../models/admin.model.js";
import generateToken from "../middlewares/generateToken.js";

const register = async(req, res) => {
    try {
        const { name, surname, phone, email, password } = req.body

        if(!name || !surname || !phone || !email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios' 
            })
        }

        if(phone.length!=10){
            return res.status(400).json({
                ok: false,
                msg: 'Numero celular incorrecto'
            })
        }

        if(password.length<=9){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña debe contener 10 Digitos'
            })
        }

        const adminfind = await Administrador.findOne({email})
        if(adminfind){
            return res.status(400).json({
                ok: false,
                msg: 'Correo electronico invalido' 
            })
        }

        let admin = new Administrador({
            name,
            surname,
            phone,
            email,
            password
        })

        admin.password = await admin.encryptPassword(password)
        admin.save()

        return res.status(200).json({
            ok: true,
            msg: 'Administrador creado exitosamente' 
        })
        
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: `Error inesperado: ${error.message}`,
        })
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            })
        }

        const admin = await Administrador.findOne({email})
        if(!admin){
            return res.status(400).json({
                ok: false,
                msg: "Correo electronico no registrado"
            })
        }

        const comparePassword = await admin.comparePassword(password, admin.password)
        if(!comparePassword){
            return res.status(400).json({
                ok: false,
                msg: `Contraseña incorrecta`
            })
        }

        const token = generateToken(admin._id)

        return res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: `Error inesperado: ${error.message}`,
        })
    }
}

export {
    register,
    login
}