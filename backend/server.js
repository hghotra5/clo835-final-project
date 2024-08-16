const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello from Node.js API Server!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
