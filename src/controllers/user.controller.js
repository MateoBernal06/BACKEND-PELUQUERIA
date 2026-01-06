import Usuario from '../models/user.model.js'
import generateToken from '../middlewares/generateToken.js'

const register = async(req, res) =>{
    try {
        const {name, surname, phone, address, email, password} = req.body
    
        if(!name || !surname || !phone || !address || !email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            })
        }
    
        if(phone.length != 10){
            return res.status(400).json({
                ok: false,
                msg: 'Numero de celular incorrecto'
            })
        }
    
        const findUser = await Usuario.findOne({email})
        if(findUser){
            return res.status(400).json({
                ok: false,
                msg: 'Correo electronico invalido'
            })
        }

        if(password.length<10){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña de contener 10 Digitos'
            })
        }

        
        let user = new Usuario({
            name, 
            surname, 
            phone, 
            email, 
            password
        })

        user.password = await user.encryptPassword(password)
        await user.save()
    
        return res.json({
            ok: true,
            msg: 'Usuario creado exitosamente'
        })
        
    } catch (error) {

        res.status(404).json({
            ok: false,
            msg: `Error inesperado al crear el usuario: ${error.message}`,
        });
    }
    
}

const login = async(req, res) => {
    
    try {
        const {email, password} = req.body
    
        if(!email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios' 
            })
        }

        const user = await Usuario.findOne({email})
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Correo electronico invalido'
            })
        }

        const comparePassword =  await user.getPassword(password,user.password)
        
        if(!comparePassword){
            return res.status(400).json({
                ok: false,
                msg: `Contraseña incorrecta`
            })
        }

        const token = generateToken(user._id)

        return res.status(200).json({
            ok: true,
            token
        })


    } catch (error) {
        
        res.status(404).json({
            ok: false, 
            msg: `Error inesperado con el usuario: ${error.message}`
        })
    }

}


export {
    register, 
    login
}