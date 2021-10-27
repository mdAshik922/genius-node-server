const express = require('express');
const app = (express());
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const port = 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.89jki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("Food_Master").collection("user");

//   app.get('/users', (req, res) =>{
//       const users = collection.find({});
//       const allUsers = users.toArray();
//       res.send(users) })
//   // perform actions on the collection object
// //   client.close();
// console.log('db conect')
// });
async function run() {
    try {
      await client.connect();
      const database = client.db('Food_Master');
      const movies = database.collection('user');
      app.get('/users', async(req, res) =>{
              const users = collection.find({});
              const allUsers = users.toArray();
              res.send(users)
          })

          app.post('/service', async(req, res)=>{
            const users = collection.find({});
            const allUsers = users.toArray();
            res.json(users)

          })
          console.log('db conect moto');
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }}
  run().catch(console.dir);

app.listen(port, ()=>{
    console.log('my server running', port)
})