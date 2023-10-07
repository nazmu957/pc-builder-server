require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rpi3hpm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("pc-builder");
    const productsCollection = db.collection('products');
    const categoriesCollection = db.collection('categories');
    const infoCollection = db.collection('info');
    const detailsCollection = db.collection('details');

    app.get('/products', async (req, res) => {
      const cursor = productsCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });
    app.get('/categories', async (req, res) => {
      const cursor = categoriesCollection.find({});
      const categories = await cursor.toArray();

      res.send({ status: true, data: categories });
    });
    app.get('/info', async (req, res) => {
      const cursor = infoCollection.find({});
      const info = await cursor.toArray();

      res.send({ status: true, data: info });
    });
    app.get('/details', async (req, res) => {
      const cursor = detailsCollection.find({});
      const details = await cursor.toArray();

      res.send({ status: true, data: details });
    });

    

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;

      const result = await productsCollection.findOne({ id: id });
      console.log(result);
      res.send(result);
    });
    app.get("/categories/:id", async (req, res) => {
      const id = req.params.id;

      const result = await categoriesCollection.findOne({ id: id });
      console.log(result);
      res.send(result);
    });
    app.get("/info/:id", async (req, res) => {
      const id = req.params.id;

      const result = await infoCollection.findOne({ id: id });
      console.log(result);
      res.send(result);
    });
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;

      const result = await detailsCollection.findOne({ id: id });
      console.log(result);
      res.send(result);
    });

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
