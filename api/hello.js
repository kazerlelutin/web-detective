import { db } from "../services/db.mjs";

export default async function hello(_req, res)  {
    
    console.log(db);
   
    return res.status(200).json({ text: 'Hello'})

}