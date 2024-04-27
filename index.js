const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ddlv3rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const artCraftCollection = client.db('dbArtCraft').collection('dbArtCraft')

app.get('/craft', async(req, res)=>{
    const cursor = artCraftCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})
    app.post('/craft', async(req, res)=>{
        const addCraft = req.body
        console.log(addCraft);
        const result = await artCraftCollection.insertOne(addCraft);
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req, res)=>{
    res.send('craft making to server')
})
app.listen(port, ()=>{
    console.log(`craft server is runnig : ${port}`);
})