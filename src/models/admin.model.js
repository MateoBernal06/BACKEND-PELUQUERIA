import { Schema } from "mongoose";

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


export default model("Administrador", AdminSchema);