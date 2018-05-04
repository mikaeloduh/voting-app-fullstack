const express      = require("express");
const cors         = require('cors');
const bodyParser   = require('body-parser');
const dotenv       = require('dotenv');
const db           = require("./models");

const PORT         = process.env.PORT || 8081;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
