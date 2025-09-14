const express = require('express')
const {MongoClient}=require('mongodb');
//or import {MongoClient} from 'mongodb'
const cors=require('cors');
const dotenv=require('dotenv')
dotenv.config()

// Use the connection URL from your .env file
const url = process.env.Mongo_URI;
const client = new MongoClient(url);

//Database Name
const dbname='passman'
const app = express()
const port = 3000
// Middleware
app.use(express.json()); // simpler than body-parser
app.use(cors());
client.connect();

//get passwords
// server.js (update GET handler)
app.get('/', async (req, res) => {
  const db = client.db(dbname);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  // Map _id to id and convert ObjectId to string
  const resultWithId = findResult.map(item => ({
    ...item,
    id: item._id.toString(),
    _id: undefined // optional: remove _id if not needed
  }));
  res.json(resultWithId);
});


//save the passwords
app.post('/', async(req, res) => {
  const password=req.body
  const db=client.db(dbname);
  const collection=db.collection('passwords');
  const findResult=await collection.insertOne(password);
  res.send({success:true,result:findResult})
})

//delete the password by id
const { ObjectId } = require('mongodb');

app.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const db = client.db(dbname);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne({ _id: new ObjectId(id) });
  res.send({ success: true, result: findResult });
});

// UPDATE by id
app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const db = client.db(dbname);
  const collection = db.collection('passwords');
  const findResult = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
  res.send({ success: true, result: findResult });
});


app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`)
})