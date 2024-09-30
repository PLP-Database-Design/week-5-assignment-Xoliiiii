//Declare dependencies/variables
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const  cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to the database

const db = mysql.createConnection(
  {
    host: process.env.HOST_DB,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
);

// Check if db connection works 

db.connect((err) => {
  if (err) return console.log('Error connecting to the database');

    console.log('Connected to the database successfully as id:' , db.threadId)

 // Question 1 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/data', (req, res) =>
{
  db.query('SELECT * FROM patients' , (err , results) =>{
    if (err) {
      console.log(err);
      res.statusMessage(500).send('Error retrieving data');
    }else{
      res.render('data' , {results: results});
    }
  })
})


//Question 2
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/providers', (req, res) => {
  db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) =>{
    if (err) {
      console.log(err);
      res.statusMessage(500).send('Error retrieving data');
    }else{
      res.render('providers' , {results:results})
    }
  })
})

//Question 3 
app.set('view engine' , 'ejs');
app.set('views', __dirname + '/views');

app.get('/firstName', (req, res) => {
  db.query('SELECT first_name FROM patients', (err, results) => {
    if (err) {
      console.log(err);
      res.statusMessage(500).send('Error retrieving data');
    }else{
      res.render('firstName', {results:results})
    }
  })
})

//Question 4 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/specialty' , (req,res) => {
  db.query('SELECT provider_specialty FROM providers GROUP BY provider_specialty' , (err, results) => {
    if (err){
      console.log(err);
      res.statusMessage(500).send('Error retrieving data')
    }else{
      res.render(
        'specialty', {results: results}
      )
    }
  })
})

  app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);

    //Send a message to the browser
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
      res.send('Server started successfully! ')
    })
  });
});






