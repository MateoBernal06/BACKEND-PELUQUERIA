import mongoose from "mongoose";
import "dotenv/config";

const connectionDataBase = async() => {
    try{
        await mongoose.connect(process.env.URL_MONGO);
        console.log('Connection successful'.bgCyan)

    }catch(error){
        console.log(`Error inesperado: ${error.message}`);
        process.exit(1);
    }
}

export default connectionDataBase;
