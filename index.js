const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const chatRouter = require('./routes/users')
dotenv.config()

const url = `mongodb+srv://Vladimir:vp121079@cluster0.oilzy.mongodb.net/chat`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(helmet())
app.use(morgan('common'))
app.use(chatRouter)

app.listen(3000, () => {
  console.log('ready...');
})