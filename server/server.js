const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongodb = require('../database/mongodb.js')

const { InMemorySessionStore } = require('../server/helpers/sessionStore')
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const axios = require('axios');
const sessionStore = new InMemorySessionStore()
const db = require('../database/database.js');


// const { default: socket } = require('../client/src/socket.js');
// const httpServer = require('http').createServer()
// const io = require('socket.io')(httpServer)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// io.use((socket, next) => {
//   console.log('socket', socket)
//   next();
// });

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
  // db.getExerciseLog(req.query.user_id)
  //   .then(data => {
  //     console.log('get data', data)
  //     res.status(200).send(data)
  //   })
  var user_id = req.query.user_id;
  var queryString = `SELECT * FROM exercise WHERE user_id=${user_id}`;
  db.pool.query(queryString, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once get exercise log' + err);
    } else {
      res.status(201).send(result.rows);
    }
  })
});

app.post('/logExercise', async (req, res) => {
  console.log('logExercise post req.bod', req.body.params)
  var user_id = req.body.params.user_id;
  var name = req.body.params.name;
  var time = req.body.params.time;
  // db.postExercise(user_id, name, time)
  //   .then(data => {
  //     res.status(200).send()
  //   })
  var date = new Date();
  date = date.toUTCString();

  var queryString = `INSERT INTO exercise (user_id, exercise_name, date, time) VALUES($1,$2,$3,$4)`;
  db.pool.query(queryString, [user_id, name, date, time], (err, result) => {
    if (err) {
      res.status(400).send('Error occues once add the exercise' + err);
    } else {
      res.status(201).send('Add the exercise successfully!');
    }
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
  const options = { timeZone: 'America/Los_Angeles' };
  const pacificTime = date.toLocaleString('en-US', options);
  date = pacificTime;

  var user_id = req.body.userId;
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

// GET REQUEST to retrieve all the total calories for progress page
app.get('/ProgressNutrition', async (req, res) => {
  var specialDate = '05/12/2023';
  var queryString = `SELECT SUM(total_calories) FROM nutrition WHERE date =$1`;
  var queryValues = [specialDate];
  db.pool.query(queryString, queryValues, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once retrieve the total calories' + err);
    } else {
      res.status(201).send(result.rows);
    }
  })
});

/*-----chat---------------------------------------*/

io.use((socket, next) => {

  const sessionID = socket.handshake.auth.sessionID
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});
io.on('connection', (socket) => {
  console.log('hihihi')
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });
  console.log('someone connected')
  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
    });
  })
  console.log(users)
  socket.on('makefriend', ({ from, to }) => {
    console.log('999999')
    mongodb.addfriend(from, to).then(() => {
      return mongodb.addfriend(to, from)
    }).then((a) => {
      let receipient
      for (let [id, socket] of io.of("/").sockets) {
        console.log('????,,,,,,', id, socket.username)
        if (to === socket.username) {
          receipient = id
        }
      }
      console.log('????', receipient)
      socket.to(receipient).emit('makefriend', {
        from: from
      })
    })
  })

  socket.on("private message", ({ content, to, from }) => {
    let receipient
    for (let [id, socket] of io.of("/").sockets) {
      console.log('o', id, socket.username, from)
      if (to === socket.username) {
        receipient = id
      }
    }
    console.log(receipient)
    mongodb.createmessage(from, to, content)
    socket.to(receipient).emit("private message", {
      content,
      from: from,
    });
  });
  socket.on('addfriend', ({ from, to }) => {
    let receipient
    for (let [id, socket] of io.of("/").sockets) {
      console.log('o', id, socket.username, from)
      if (to === socket.username) {
        receipient = id
      }
    }
    socket.to(receipient).emit("addfriend", {
      from: from,
    });
  })
})


app.get('/friendlist', (req, res, next) => {
  mongodb.findfriendlist(req.query.user).then((friendlist) => {
    res.send(friendlist)
  })
})
app.get('/getchathistory', (req, res, next) => {
  mongodb.findmessage(req.query.sender, req.query.recipient).then((data) => {
    res.send(data)
  })
})
app.get('/searchfriend', (req, res, next) => {
  console.log('>>>>', req.query.friend)
  if (req.query.friend === 'jack') {
    res.send('jack')
  } else {
    res.send('no such person')
  }
})
/*-----Profile---------------------------------------*/
app.get('/profile', (req, res) => {
  var sample_user = {
    user_id: "1",
    username: "username",
    photo: "https://picsum.photos/200",
    email: "test@gmail.com",
    password: "passord",
    food_favor: "food",
    exercise_favor: "exercise",
    friends: [2, 3]
  }

  res.status(200).send(sample_user);
});

app.put('/profile', (req, res) => {
  res.status(200).send(req.body);
});


/*-----Authentication---------------------------------------*/
app.post('/signup', (req, res) => {
  console.log('running');
  db.pool.query(`INSERT INTO users (user_id, username) VALUES ('${req.body.uid}', '${req.body.username}')`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send('Error');
    } else {
      res.status(200).send('success');
    }
  })
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});