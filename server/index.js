const express = require("express");
const path = require("path");
const https = require('https');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// Have Node serve the files for built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    const url = "https://restcountries.com/v2/regionalbloc/eu?fields=name,capital,currencies,flags,population";
    https.get(url, function(response){

        //collect all res data and send it to client
        let finalData = '';
        response.on("data", function (data) {
            finalData += data.toString();
        });
        response.on("end", function() {
            const countryData = JSON.parse(finalData);
            res.send(countryData);
        });   
    })
});

//All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});