const express      = require("express");
const cors         = require('cors');
const bodyParser   = require('body-parser');
const dotenv       = require('dotenv');
const db           = require("./models");
const authRoute    = require("./routes/auth");
const pollsRoute   = require("./routes/polls");
const errorHandler = require("./api/error");

const PORT         = process.env.PORT || 8081;

const app = express();
dotenv.config({verbose: true});
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/api/polls", pollsRoute);

app.use(function(req, res, next) {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
