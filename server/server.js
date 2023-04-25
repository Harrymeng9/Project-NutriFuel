const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/', (req, res) => {
  res.status(200).send('Main Get')
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});