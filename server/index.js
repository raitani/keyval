const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const config=require('./config')
const routes=require('./api/routes')
const cors=require('cors')
const http = require('http').Server(app);



mongoose
  .connect(
    config.database_url,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//redirecting all request calls to routes.js
app.use('/',routes)




const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
