const express= require('express')
const cors = require('cors')
const port = process.env.PORT || 4000;
const app = express();
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();
app.use(cors())
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q83cw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




app.get('/', (req, res) => {
    res.send("lollllllllll")
})


client.connect(err => {
  const collection = client.db("volunteer").collection("service");

  //Adding Data to the Database
  app.post('/addEvent', (req, res) => {
    const newEvent = req.body;
console.log('adding new event: ', newEvent)
    collection.insertOne(newEvent)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
    .catch(err => console.log(err))
})
  
  app.get('/allEvents',(req,res)=>{
    collection.find()
    .toArray((err, doc)=>{
      res.send(doc)
    })
  })

    //deleting data from the database
    app.delete("/deleteEvent/:id", (req, res) => {
      console.log(req.params.id);
      collection
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then((result) => res.send(result.deletedCount>0))
        .catch((err) =>console.log(err))
    });


  // app.post("/allProduct", (req, res) => {
  //   const products = req.body;
  //   collection.insertMany(products).then((result) => {
  //     console.log(result.insertedCount);
  //   //   res.send(result.insertedCount);
  //   });
  // });
  console.log("SERVER READY")
});


app.listen(port)