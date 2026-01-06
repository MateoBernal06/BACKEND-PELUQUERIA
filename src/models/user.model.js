import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
        name: {
            type: String,
            require: true,
            trim: true,
        },

        surname: {
            type: String,
            require: true,
            trim: true,
        },

        phone: {
            type: String,
            require: true,
            trim: true,
        },

        address : {
            type: String,
            require: true,
            trim: true
        },

        email: {
            type: String,
            require: true,
            trim: true,
        },

        password: {
            type: String,
            trim: true,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

UserSchema.methods.encryptPassword = async function (password){
    const salt =  await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

UserSchema.methods.getPassword = async function (password, hash) {
    const compare = await bcrypt.compare(password, hash)
    return compare
}


export default model("Usuario", UserSchema)