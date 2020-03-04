const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require* ('dotenv').config();

const app= express();
const port = process.env.PORT || 5000;

//process all response bodies as json
app.use(bodyParser.json());

//make sure URLs have proper characters
app.use(bodyParser.urlencoded({extended: true}));

//cross origin request
app.use(cors());

//serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));


  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if(error) throw error;
  console.log('Server running on ' + port);
})