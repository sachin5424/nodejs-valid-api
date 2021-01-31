const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const user_register = require('./router/user_register')
const mongo_sever = require('./models/conn')
app.use(cors())
app.use(bodyParser.json())
app.use('/',user_register)

app.listen(3002)