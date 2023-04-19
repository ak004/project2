const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');

require("./routes/home")(app);


 app.use(express.static('./assets'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("*", function (req, res) {
    res.render("pages-error");
  });
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

