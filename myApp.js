const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  const log = `${req.method} ${req.path} - ${req.ip}`;
  console.log(log);
  next();  
})

app.get('', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.send({
    "message": message
  });
})

app.get('/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      "time": req.time
    });
  }
)

app.get('/:word/echo', (req, res) => {
  res.send({
    "echo": req.params.word
  });
})



































 module.exports = app;
