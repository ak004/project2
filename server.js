const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
var multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
var session = require('express-session');
const bodyParser = require('body-parser');

 



const upload = multer({ dest: 'uploads/' });
app.use(upload.any());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
bodyParser.json();

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// Set up CORS
app.use(cors());


app.use(express.static('./assets'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'resturant_secret',
  maxAge: '18000'
}));

app.use('/images',express.static('images'))

require("./routes/home")(app);
require("./routes/apis")(app);
app.use((err, req, res, next) => {
  console.error("FROM MIDDLEWARE----------------------",err.stack);
  res.status(500).send('Something broke!');
});

const db = "mongodb://0.0.0.0:27017/project2"

  const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('MongoDB successfully connected') 
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}


connectDB();



app.get("*", function (req, res) {
    res.render("pages-error");
  });
  

  // Error-handling middleware
app.use((err, req, res, next) => {
  console.error("FROM MIDDLEWARE----------------------", err.stack);
  res.status(500).send('Something broke!');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error("Uncaught Exception: ", err.stack);
  // Optionally exit the process
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally exit the process
  process.exit(1);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });


