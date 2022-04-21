import { database } from "../../../firebase"
import users from "../../../lib/models/user";
import mongooseDB from "../../../lib/mongoose/mongoose";

export const config = {
    api: {
      bodyParser: true,
    },
  };

export default async function handler(req, res) {
  

  res.status(201).json({message:"Sorry For Disturbing :("})
}
