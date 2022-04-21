import users from "../../../../lib/models/user";
import { mongooseDB,mongooseDisconnect } from "../../../../lib/mongoose/mongoose";

const handler = async (req, res) => {

        await mongooseDB();
        const name = req.query.slug[0];
        const email = req.query.slug[1];
        
        try {
            const data = await users.find({name , email});
            if(data!==[]){
            return res.status(201).json(data)
            }
            return res.status(401).json({message:"invalid info"})
        } catch (error) {
            res.status(402).json({message:"invalid info"})
        }
}
export default handler;