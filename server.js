// const express = require('express');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
const {startPrompt} = require('./routes/prompts');

//const app = express();
const PORT = process.env.PORT || 3001;


// Express middleware
/*app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/apiRoutes', apiRoutes);

// Default response for any other request (Not Found)

app.use((req, res) => {
  res.status(404).end();
});*/


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  startPrompt();
});
