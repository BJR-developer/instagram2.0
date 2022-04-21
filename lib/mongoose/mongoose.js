import mongoose from 'mongoose'

const connection = {}

export const mongooseDB = async()=>{
    if(connection.isConnected){
        return
    }
    const db =await mongoose.connect(process.env.MONGODB_URI , {
        useNewUrlParser:true,
        useUnifiedTopology:true
    } , (err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log("MongoDB Connected by Mongoose")
        }
    })
    // connection.isConnected = db.connection[0].readyState;
}
export const mongooseDisconnect = async() =>{
    await mongoose.disconnect((err)=>{
        if(err){
            console.log(err);
        }
    });
}