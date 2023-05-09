const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const http = require('http').Server(app)
const io = require('socket.io')(http)

const axios = require('axios');
const db = require('../database/database.js');
//const { default: socket } = require('../client/src/socket.js');

// const httpServer = require('http').createServer()
// const io = require('socket.io')(httpServer)



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));
// io.use((socket, next) => {
//   console.log('socket',socket)
//   next();
// });
io.on("connection", (socket) => {
  console.log("llll")
  for(let [id] of io.of("/").sockets){
    console.log(id)
  }
  }

  // ...
);
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
 });

 app.get('/exerciseLog', async (req, res) => {
   db.getExerciseLog(req.query.user_id)
   .then(data => {
     console.log('get data', data)
    res.status(200).send(data)
  })
})

app.post('/logExercise', async (req, res) => {
  console.log('logExercise post req.bod', req.body.params)
  var name = req.body.params.name;
  var time = req.body.params.time;
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
/*-----chat---------------------------------------*/
// io.on('connection', () => {
//   console.log('someone connected')
// })


http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});