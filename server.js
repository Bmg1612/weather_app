// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Express to run server and routes
const express = require('express'); 
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
// Callback function - on top of the server variable because it is an arrow function
const callback = () => {
    console.log(`running on localhost: ${port}`)
}
// Spin up the server
const server = app.listen(port, callback);
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', function (request, response) {
    console.log(request);
    response.send(projectData);
  })
// Post Route
const data = [];
const postData = (req, res) => {
    console.log(req.body);
    data.push(req.body);
}
app.post('/', postData)