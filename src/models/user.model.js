import { Schema, model } from "mongoose";

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


export default model("Usuario", UserSchema)