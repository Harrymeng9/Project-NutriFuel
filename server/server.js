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

const moment = require('moment-timezone');

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
  db.getExerciseLog(req.query.user_id)
    .then(data => {
      var time = data[data.length - 1].time
      if (time === 0) {
        data.push({ calories: 0 })
        res.status(200).send(data)
      } else {
        axios({
          method: 'GET',
          url: 'https://api.api-ninjas.com/v1/caloriesburned?activity=building&duration=' + time,
          headers: {
            'X-Api-Key': 'v9CqesqX5ys6rlModj/Riw==qC0eVhKYsz1MF3tN'
          },
          contentType: 'application/json'
        })
          .then(result => {
            //console.log('result', result.data)
            data.push({ calories: result.data[0].total_calories })
            //console.log('result', data)
            db.postCaloriesBurned(req.query.user_id, result.data[0].total_calories)
            res.status(200).send(data)
          })
          .catch(err => {
            if (err) {
              console.log('exercise log server err', err)
            }
          })
      }
    })
});

app.post('/logExercise', async (req, res) => {
  //console.log('logExercise post req.bod', req.body.params)
  var user_id = req.body.params.user_id;
  var name = req.body.params.name;
  var time = req.body.params.time;
  // db.postExercise(user_id, name, time)
  //   .then(data => {
  //     res.status(200).send()
  //   })
  var date = new Date();
  date = date.toUTCString();

  var queryString = `INSERT INTO exercise (user_id, date, exercise_name, time) VALUES($1,$2,$3,$4)`;
  db.pool.query(queryString, [user_id, date, name, time], (err, result) => {
    if (err) {
      res.status(400).send('Error occues once add the exercise' + err);
    } else {
      res.status(201).send('Add the exercise successfully!');
    }
  })
})

app.get('/caloriesBurned', async (req, res) => {
  //console.log('calories burned query', req.query)
  var startDate = req.query.startDate.slice(0, 10);
  var endDate = req.query.endDate.slice(0, 10);
  //console.log(startDate, endDate)
  db.getCaloriesBurned(req.query.user_id, startDate, endDate)
  .then(data => {
    //console.log('calories burned get data', data)
    res.status(200).send(data)
  })
});

app.put('/deleteExercise', async (req, res) => {
  var user_id = req.body.params.user_id;
  var exercise_id = req.body.params.exercise_id;
  //console.log(user_id, exercise_id)
  db.deleteExercise(user_id, exercise_id)
  .then(data => {
    //console.log(data)
    res.status(200).send('deleted exercise')
  })
});

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

  var queryStringExistFood = `SELECT nutrition_id FROM nutrition WHERE user_id = $1 AND date = $2 AND food_name = $3`;
  var queryValuesExistFood = [user_id, date, food_name];

  db.pool.query(queryStringExistFood, queryValuesExistFood, (err, result) => {
    if (err) {
      res.status(400).send('Error occues once add the food' + err);
    } else {
      // If the food does not exist in the database, then insert a new record. Otherwise, update the existing data
      if (result.rows.length === 0) {
        var queryString = `INSERT INTO nutrition (user_id, date, food_name, qty, total_calories) VALUES($1,$2,$3,$4,$5)`;
        var queryValues = [user_id, date, food_name, qty, total_calories];
      } else {
        var nutrition_id = result.rows[0].nutrition_id;
        var queryString = `UPDATE nutrition SET qty = qty + $1, total_calories = total_calories + $2 WHERE nutrition_id = $3`;
        var queryValues = [qty, total_calories, nutrition_id];
      }
      db.pool.query(queryString, queryValues, (err, result) => {
        if (err) {
          res.status(400).send('Error occues once add the food' + err);
        } else {
          res.status(201).send('Add the food successfully!');
        }
      })
    }
  })
})

// GET REQUEST to retrieve all nutrition list for the current user
app.get('/NutritionList', async (req, res) => {
  var user_id = req.query.user_id;
  var date = req.query.selectedDate;
  const pacificTime = moment.tz(date, 'America/Los_Angeles').format('YYYY-MM-DD');
  var queryString = `SELECT * FROM nutrition WHERE user_id = $1 AND date::date = $2`;
  var queryValues = [user_id, pacificTime];

  db.pool.query(queryString, queryValues, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once retrieve the nutrition list' + err);
    } else {
      res.status(201).send(result.rows);
    }
  })
});

// PUT REQUEST to update a food qty and its total calories into the database
app.put('/NutritionListUpdate', async (req, res) => {

  var foodSearchName = req.body.food_name;
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

  const response = await axios.request(options);
  var unitCalories = response.data[0].calories;

  var nutrition_id = req.body.nutrition_id;
  var adjustQty = req.body.qty;
  var totalCalories = adjustQty * unitCalories;
  const queryString = 'UPDATE nutrition SET qty = $1, total_calories = $2 WHERE nutrition_id = $3';
  const queryValues = [adjustQty, totalCalories, nutrition_id];

  db.pool.query(queryString, queryValues, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once delete the food' + err);
    } else {
      res.status(201).send('Update it');
    }
  })
});

// PUT REQUEST to delete a food from database
app.put('/NutritionListDelete', async (req, res) => {
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

// GET REQUEST to calculate the daily total calories for a specific date
app.get('/dailyCalories', async (req, res) => {
  var user_id = req.query.user_id;
  var date = req.query.selectedDate;
  const pacificTime = moment.tz(date, 'America/Los_Angeles').format('YYYY-MM-DD');
  var queryString = `SELECT SUM(total_calories) FROM nutrition WHERE user_id = $1 AND date::date = $2`;
  var queryValues = [user_id, pacificTime];

  db.pool.query(queryString, queryValues, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once retrieve the total calories' + err);
    } else {
      res.status(201).send(result.rows[0].sum);
    }
  })
});

// GET REQUEST to retrieve all the total calories for progress page
app.get('/ProgressNutrition', async (req, res) => {
  var user_id = req.query.user_id;
  var startDate = req.query.startDate;
  var startDatePacificTime = moment.tz(startDate, 'America/Los_Angeles').format('YYYY-MM-DD');
  var endDate = req.query.endDate;
  var endDatePacificTime = moment.tz(endDate, 'America/Los_Angeles').format('YYYY-MM-DD');

  var xDates = []; // start date to end date
  var yCalories = []; // total calories for each date

  // var queryString = `
  // SELECT date, SUM(calories_burned)
  // FROM caloriesburned
  // WHERE user_id = $1 AND date >= $2 AND date <= $3
  // GROUP BY date
  // ORDER BY date ASC`;
  // var queryValues = [user_id, startDatePacificTime, endDatePacificTime];

  // var queryString = `
  // SELECT date, SUM(total_calories)
  // FROM nutrition
  // WHERE user_id = $1 AND date >= $2 AND date <= $3
  // GROUP BY date
  // ORDER BY date ASC` ;
  // var queryValues = [user_id, startDatePacificTime, endDatePacificTime];

  var queryString =
    `
    SELECT
      COALESCE(cb.date, n.date) AS date,
      COALESCE(cb.sum_calories_burned, 0) AS sum_calories_burned,
      COALESCE(n.sum_total_calories, 0) AS sum_total_calories
    FROM
    (
      SELECT date, SUM(calories_burned) AS sum_calories_burned
      FROM caloriesburned
      WHERE user_id = $1 AND date >= $2 AND date <= $3
      GROUP BY date
    ) AS cb
    FULL OUTER JOIN
    (
      SELECT date, SUM(total_calories) AS sum_total_calories
      FROM nutrition
      WHERE user_id = $1 AND date >= $2 AND date <= $3
      GROUP BY date
    ) AS n
    ON cb.date = n.date
    ORDER BY date ASC`;

  var queryValues = [user_id, startDatePacificTime, endDatePacificTime];

  db.pool.query(queryString, queryValues, (err, result) => {
    if (err) {
      res.status(400).send('Error occurs once retrieve the total calories' + err);
    } else {
      for (var i = 0; i < result.rows.length; i++) {
        var currDate = result.rows[i].date;
        currDate = moment.tz(currDate, 'America/Los_Angeles').format('YYYY-MM-DD');
        xDates.push(currDate); // ['2023-05-13', '2023-05-15', etc] ascending order
        var currData = Number(result.rows[i].sum_total_calories) - Number(result.rows[i].sum_calories_burned);
        yCalories.push(currData); // [100, 230, -200, etc]
      }

      var dateAndCalories = [];
      dateAndCalories.push(xDates);
      dateAndCalories.push(yCalories);
      // console.log('test', dateAndCalories);
      res.status(201).send(dateAndCalories);
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
  let queryString = `SELECT * FROM users WHERE user_id = $1`;
  let queryValue = [req.query.uid]
  // console.log('req.query', req.query);
  db.pool.query(queryString, queryValue, (err, result) => {
    if (err) {
      console.log('Error getting user data from databse', err)
      res.status(400).send('Error getting user data from databse');
    } else {
      res.status(201).send(result.rows[0]);
    }
  })

});

app.put('/profileedit', (req, res) => {
  let queryString = `update users set photo = $1,food_favor=$2,exercise_favor=$3 where user_id= $4;`;
  let queryValue = [req.query.photo, req.query.food, req.query.exercise, req.query.uid]
  // console.log('req.query', req.query);
  db.pool.query(queryString, queryValue, (err, result) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error update users');
    } else {
      res.status(204).send('users info updated');
    }
  })


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
