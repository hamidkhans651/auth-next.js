import { error } from "console"
import mongoose from "mongoose"

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)

    } catch (error){
        console.log('something went wrong is connecting to db')
        const connection = mongoose.connection
        
        connection.on('connected',()=> {
            console.log('MongoDB connected');
        })
        connection.on('error',(err)=> {
            console.log('MongoDB connection error,please make sure db is up and running' + err);
            process.exit()
        })


    };
    console.log(error)
    
}