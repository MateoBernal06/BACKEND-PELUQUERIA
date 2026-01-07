import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const AdminSchema = new Schema(
    {
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

        rol: {
            type: String,
            default: 'Administrador'
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
);

AdminSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

AdminSchema.methods.comparePassword = async function(text, hash) {
    const compare = await bcrypt.compare(text, hash)
    return compare
}

export default model("Administrador", AdminSchema);