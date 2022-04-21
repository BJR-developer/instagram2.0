// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { database } from "../../firebase"
import users from "../../lib/models/user";
import mongooseDB from "../../lib/mongoose/mongoose";

export const config = {
    api: {
      bodyParser: true,
    },
  };

export default async function handler(req, res) {
  
  mongooseDB();

  if(req.method==='POST'){
    const docRef = database.collection('users').doc('alovelace');
    await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });
  res.status(200).json({yes:true})
  }

  if(req.method==="GET"){
    const data =await users.find({});
    console.log(data);
    return res.status(201).json(data);
  }
}
