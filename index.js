const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpujg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const allProductsCollection = client.db("StyleHut").collection("All-Products");
  const SweaterCollection = client.db("StyleHut").collection("SweaterCollections");
  const hoodieCollection = client.db("StyleHut").collection("HoodieCollection");
  const CardiganCollection = client.db("StyleHut").collection("CardiganCollection");
  const womenShoesCollection = client.db("StyleHut").collection("WomenShoes");
  const MenJacketCollection = client.db("StyleHut").collection("MenJacketCollection");
  


  // Product get and post api....

  app.post('/addAllProducts', (req, res) => {
    const newProducts = req.body;
    allProductsCollection.insertOne(newProducts)
        .then(result => {
            res.send(result.insertedCount > 0);
        })
  })
  app.get('/products', (req, res) => {
    allProductsCollection.find()
    .toArray((err, products) => {
        res.send(products)
    })
  })


  // Women product api section

  // Sweaters get and post api... 

  app.post('/addSweaters', (req, res) => {
    const newSweaters = req.body;
    SweaterCollection.insertMany(newSweaters)
        .then(result => {
            res.send(result.insertedCount);
        })
  })

  app.get('/sweaters', (req, res) => {
    SweaterCollection.find()
    .toArray((err, sweaters) => {
        res.send(sweaters)
    })
  })

  app.get('/sweater/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    SweaterCollection.find(id)
    .toArray((err, sweater) => {
      res.send(sweater)
    })
  })



  // Hoodies get and post api........

  app.post('/addHoodies', (req, res) => {
    const newHoodies = req.body;
    hoodieCollection.insertMany(newHoodies)
        .then(result => {
            res.send(result.insertedCount);
        })
  })

  app.get('/hoodies', (req, res) => {
    hoodieCollection.find()
    .toArray((err, hoodies) => {
        res.send(hoodies)
    })
  })

  app.get('/hoodie/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    hoodieCollection.find(id)
    .toArray((err, hoodie) => {
      res.send(hoodie)
    })
  })

  // Cardigan api........

  app.post('/addCardigans', (req, res) => {
    const newCardigans = req.body;
    CardiganCollection.insertMany(newCardigans)
        .then(result => {
            res.send(result.insertedCount);
        })
  })

  app.get('/Cardigans', (req, res) => {
    CardiganCollection.find()
    .toArray((err, Cardigans) => {
        res.send(Cardigans)
    })
  })

  app.get('/Cardigan/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    CardiganCollection.find(id)
    .toArray((err, Cardigan) => {
      res.send(Cardigan)
    })
  })

  // Shoes api........

  app.post('/addWomenShoes', (req, res) => {
    const newWomenShoes = req.body;
    womenShoesCollection.insertMany(newWomenShoes)
        .then(result => {
            res.send(result.insertedCount);
        })
  })

  app.get('/womenShoes', (req, res) => {
    womenShoesCollection.find()
    .toArray((err, womenShoes) => {
        res.send(womenShoes)
    })
  })

  app.get('/womenShoes/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    womenShoesCollection.find(id)
    .toArray((err, womenShoes)=> {
      res.send(womenShoes)
    })
  })
  
  // Man collections api

  app.post('/addMenJackets', (req, res) => {
    const newManJacket = req.body;
    MenJacketCollection.insertMany(newManJacket)
        .then(result => {
            res.send(result.insertedCount);
        })
  })

  app.get('/menJackets', (req, res) => {
    MenJacketCollection.find()
    .toArray((err, menJackets) => {
        res.send(menJackets)
    })
  })

  app.get('/menJacket/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    MenJacketCollection.find(id)
    .toArray((err, menJacket)=> {
      res.send(menJacket)
    })
  })

})

app.listen(port)