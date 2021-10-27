const express = require('express');
const app = (express());

require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0g3ft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db('genius_car');
      const serviceCollection = database.collection('services');

      //GET ALL DATA
      app.get('/users', async(req, res) =>{
              const users = serviceCollection.find({});
              const allUsers = await users.toArray();
              res.send(allUsers)
          })

// GET SINGLE SERVICE
app.get('/service/:id', async(req, res) =>{
  const id = req.params.id;
  console.log('getting specific id', id);
  const query = {_id: ObjectId(id)};
  const service = await serviceCollection.findOne(query);
  res.json(service)
})
//GET POST API
          app.post('/service', async(req, res)=>{
            const service = req.body;
            const allUsers = await serviceCollection.insertOne(service);
            res.json(allUsers)
          })

          //GET DELETE API
          app.delete('/service/:id', async(req, res) =>{
            const id = req.params.id;
            // console.log(id)
            const query = {_id: ObjectId(id)}
            const result = await serviceCollection.deleteOne(query)
            res.json(result);
          })

          // console.log('db conect ');
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }}
  run().catch(console.dir);
  
  app.get('/', async(req, res) =>(
    res.send('hello world')
  ))

app.listen(port, ()=>{
    console.log('my server running', port)
})