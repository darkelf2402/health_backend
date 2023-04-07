import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Records from './health_model.js';
import Data from './Data.js';

const app = express(); 
const port = process.env.PORT || 8000;

const connection_url = "mongodb+srv://vatsa:12345678g@cluster0.t0q8ivk.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connection_url);

app.use(express.json());
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    next()
})
app.use(cors());


// endpoints

app.get('/' , (req,res) => res.status(200).send("Working yeee"));

app.get('/get_records' , (req,res) => res.status(200).send(Data));

app.post('/upload', async (req,res) => {  // this is to add data to the database
    const dbRecords = req.body;
    try{
        const records = await Records.create(dbRecords)
        res.status(201).json(records) 
    }
    catch(err) {
        console.log(err);
    } ;
})

app.get('/records',async (req,res) => {
    try{
        const records = await Records.find({});
        res.status(200).json(records);
    }
    catch(err){
        console.log(err);
    }
})



app.listen(port , () => console.log(`Server running on ${port}`));