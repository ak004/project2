const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
var multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
var session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app); 


const wss = new WebSocket.Server({ noServer: true });

// Define WebSocket message handling
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('WebSocket message received:', message);
    // Handle WebSocket messages for the /login route here
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

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
  resave: true,
  saveUninitialized: true,
  secret: 'resturant_secret',
  maxAge: '1h'
}));

app.use('/images',express.static('images'))

require("./routes/home")(app);
require("./routes/apis")(app);

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


