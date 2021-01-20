// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

const port = 8000;

// Spin up the server
app.listen(
  port,
  (callback = () => {
    console.log(`running on localhost: ${port}`);
  })
);

const apiKey = process.env.API_KEY;

// API key
app.get("/api", (req, res) => {
  res.send({ key: apiKey });
});

// Callback function to complete GET '/data'
app.get("/data", function (request, response) {
  response.send(projectData);
});
// Post Route
app.post(
  "/data",
  (postData = (req, res) => {
    projectData["date"] = req.body.date;
    projectData["temperature"] = req.body.temperature;
    projectData["user_response"] = req.body.user_response;
    console.log(projectData);
    res.send(projectData);
  })
);
