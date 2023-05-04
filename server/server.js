const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const axios = require('axios');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  res.status(200).send('Main Get')
});

/* ------------------Exercise-------------------*/
app.get('/exercise', async (req, res) => {
  var muscle = req.query.name;
  const options = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
    headers: {
      'X-Api-Key': 'v9CqesqX5ys6rlModj/Riw==qC0eVhKYsz1MF3tN'
    },
    contentType: 'application/json'
  }

  try {
    const response = await axios.request(options);
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).send('Failed to connect to exercise API');
  }
})

/* ------------------Nutrition------------------*/
app.get('/Nutrition', async (req, res) => {

  var foodSearchName = req.query.foodSearchName;
  const options = {
    method: 'GET',
    url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
    params: {
      query: `${foodSearchName}`
    },
    headers: {
      'X-RapidAPI-Key': '9ffc3f8601msh7e418407ae18e5ep117f98jsn209b51d30f62',
      'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).send(response.data[0]);
  } catch (error) {
    console.error(error);
    res.status(404).send('Failed to connect to nutrition API');
  }
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});