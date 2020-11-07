const { json } = require('express');
const express = require('express')
const app = express()
const port = 5000

var randomRoutes = require('./routes/randomFacts'); 

app.use(express.json());

app.use('/randomfacts',randomRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`App started at port :${port}`);
})