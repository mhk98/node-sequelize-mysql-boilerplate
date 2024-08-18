const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var http = require("http");

require("./models");
require("dotenv").config();
const shortid = require("shortid");

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", routes);

// port initializing
const port = 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//static image folder
app.use("/images", express.static("images"));

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

// main route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// error handler
// app.use([notFoundHandler, errorHandler]);

//create a server object:

// Catch-all route for handling API not found
app.use((req, res, next) => {
  res.status(404).json({ error: "API not found" });
});

const server = http.createServer(app);

// listening server
server.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);