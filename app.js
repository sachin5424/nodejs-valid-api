const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const user_register = require('./router/user_register')
const user_login = require('./router/user_login')
const user_email_verfiy = require('./router/email_verify')
const mongo_sever = require('./models/conn')
app.use(cors())
app.use(bodyParser.json())
app.use('/',user_register)

app.use('/user',user_login)
app.use('/user/email',user_email_verfiy)

app.listen(3002)