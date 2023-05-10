const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app)
//const io = require('socket.io')(http)
const PORT = 3000;
const axios = require('axios');
const db = require('../database/database.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  res.status(200).send('Main Get')
});

/* ------------------Exercise-------------------*/
app.get('/exercise', async (req, res) => {
  var muscle = req.query.name;

  try {
    const response = await axios({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
      headers: {
        'X-Api-Key': 'v9CqesqX5ys6rlModj/Riw==qC0eVhKYsz1MF3tN'
      },
      contentType: 'application/json'
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).send('Failed to connect to exercise API');
  }
});

app.get('/exerciseLog', async (req, res) => {
  var excersieLog;
  db.getExerciseLog(req.query.user_id)
  .then(async (data) => {
    //console.log('get data', data);
    var time = 0;
    data.map(entry => {
      time = time + entry.time;
    })
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/caloriesburned?activity=building&duration=' + time,
        headers: {
          'X-Api-Key': 'v9CqesqX5ys6rlModj/Riw==qC0eVhKYsz1MF3tN'
        },
        contentType: 'application/json'
      })
      data.push({calories: response.data[0].total_calories})
      //console.log(data)
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(404).send('Failed to connect to exercise API');
    }
  })
});

app.post('/logExercise', async (req,res) => {
  // console.log('logExercise post req.bod', req.body.params)
  var user_id = req.body.params.user_id;
  var name = req.body.params.name;
  var time = req.body.params.time;
  db.postExercise(user_id, name, time)
  .then(data => {
    res.status(200).send()
  })
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
    res.status(404).send('Failed to connect to nutrition API');
  }
});

// Post Request - Add food into the database
app.post('/Nutrition', async (req, res) => {
  var date = new Date();
  date = date.toUTCString();

  var user_id = 1; // need update the user_id
  var food_name = req.body.foodName;
  var qty = req.body.qty;
  var total_calories = req.body.totalCalories;

  var queryString = `INSERT INTO nutrition (user_id, date, food_name, qty, total_calories) VALUES($1,$2,$3,$4,$5)`;
  db.pool.query(queryString, [user_id, date, food_name, qty, total_calories], (err, result) => {
    if (err) {
      res.status(400).send('Error occues once add the food' + err);
    } else {
      res.status(201).send('Add the food successfully!');
    }
  })
});

// GET REQUEST to retrieve all nutrition list for the current user
app.get('/NutritionList', async (req, res) => {

  var queryString = `SELECT * FROM nutrition`;
  db.pool.query(queryString, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once retrieve the nutrition list' + err);
    } else {
      res.status(201).send(result.rows);
    }
  })
});

// PUT REQUEST to delete a food from database
app.put('/NutritionList', async (req, res) => {

  var nutrition_id = req.body.nutrition_id;

  var queryString = `DELETE FROM nutrition WHERE nutrition_id = ${nutrition_id}`;
  db.pool.query(queryString, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once delete the food' + err);
    } else {
      res.status(201).send('Delete it');
    }
  })
});


/*-----chat---------------------------------------*/
// io.on('connection', () => {
//   console.log('someone connected')
// })

/* ------------------Profile------------------*/

app.get('/profile', (req, res) => {
  var sample_user = {
    user_id:"1",
    username:"username",
    photo:"https://picsum.photos/200",
    email:"test@gmail.com",
    password:"passord",
    food_favor: "food",
    exercise_favor:"exercise",
    friends: [2,3]
  }

  res.status(200).send(sample_user);
});

app.put('/profile', (req, res) => {
  res.status(200).send(req.body);
});


http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});