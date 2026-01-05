import Usuario from '../models/user.model.js'

const register = async(req, res) =>{
    try {
        const {name, surname, phone, address, email, password} = req.body
    
        if(!name || !surname || !phone || !address || !email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Campos vacios'
            })
        }
    
        if(phone.length != 10){
            return res.status(400).json({
                ok: false,
                msg: 'Numero de celular incorrecto'
            })
        }
    
        const findUser = await Usuario.find({email})
        if(findUser[0]){
            return res.status(400).json({
                ok: false,
                msg: 'Correo electronico invalido'
            })
        }
        if(password<10){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña de contener 10 Digitos'
            })
        }
    
        const user = new Usuario({
            name, 
            surname, 
            phone, 
            email, 
            password
        })
    
        await user.save()
    
        res.json({
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


export {
    register
}