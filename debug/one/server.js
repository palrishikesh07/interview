import express from 'express';

import {calculateTotal} from "./cart.js";


const app = express();

app.use(express.json());

app.post('/get-total',(req,res)=>{
    const total = calculateTotal(req.body);
    res.json({total})
});

app.listen(3000,()=>console.log('Listening on port 5000'))