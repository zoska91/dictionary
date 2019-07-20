const express = require('express');
const path = require('path');
const dictRoutes = require('./routes/dict');
const mongo = require('mongodb');

const app = express();
const client = new mongo.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

app.listen(3000, () => console.log('Server at http://localhost:3000'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

dictRoutes(app, client);
