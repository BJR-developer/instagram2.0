import mongoose from "mongoose";
mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
   
    name:{
        type:String
    },
    email:{
        type:String
    },
    image:{
        type:String
    },

})

export default mongoose.models?.users || mongoose.model("users" , schema)