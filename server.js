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

app.get("*", function (req, res) {
  res.render("pages-error");
});

app.use((err, req, res, next) => {
  console.error("FROM MIDDLEWARE----------------------",err.stack);
  res.status(500).send('Something broke!');
});








const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

  // Error-handling middleware

  process.on('uncaughtException', (err) => {
    console.error("FROM process----------------------", err.stack);
    // Safely close the server and then exit the process
    // server.close(() => {
    //   console.log('Server closed');
    //   process.exit(1); // Exit with a failure code
    // });
  
    // // If the server hasn't finished closing after a certain time, force exit
    // setTimeout(() => {
    //   console.error('Forcibly shutting down the server');
    //   process.exit(1);
    // }, 10000).unref(); // .unref() prevents this timeout from keeping the application open
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally exit the process
  process.exit(1);
});