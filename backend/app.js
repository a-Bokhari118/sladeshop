const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');
const dotenv = require('dotenv');
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload());

dotenv.config({ path: 'backend/config/config.env' });
//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
