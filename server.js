const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./router');
const mongoose = require('mongoose');
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);
mongoose.connect('mongodb+srv://sidvarma:1234@cluster0.ladss.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

app.listen(3001, () => {
    console.log("connected....");
});
