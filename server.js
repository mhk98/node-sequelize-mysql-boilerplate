const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

require("./models");
require("dotenv").config();
const shortid = require("shortid");


// middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:5000"],
  })
);



app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", routes);

// port initializing
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// main route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// error handler
// app.use([notFoundHandler, errorHandler]);

// listening server
app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
