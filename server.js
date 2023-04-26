const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
var session = require('express-session');
const bodyParser = require('body-parser');


app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'bscrsecretcode',
  maxAge: '1h'
}));


require("./routes/home")(app);


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
  
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });


