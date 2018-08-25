// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp route
app.get('/api/timestamp/:date_string?', (req, res) => {
  const { params: { date_string } } = req

  let date
  if ( date_string === undefined ) {
    // Timestamp is now
    date = new Date()
  } else {
    // Try parsing date_string
    date = new Date(date_string)
  }

  const utc = date.toUTCString()
  const unix = date.getTime()
  
  res.json({utc, unix})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});