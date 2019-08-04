const express = require('express');
const path = require('path');
const dictRoutes = require('./routes/dict');
const mongo = require('mongodb');
const config = require('./config');
// const mongoose = require('mongoose');

// mongoose.connect(config.db, { useNewUrlParser: true });

const app = express();
const client = new mongo.MongoClient(config.db, { useNewUrlParser: true });
//mongodb+srv://zoska91:deskorolka1@cluster0-tttr1.mongodb.net/test?retryWrites=true&w=majority

app.listen(process.env.PORT || 3000, () => console.log('Server at http://localhost:3000'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

dictRoutes(app, client);
