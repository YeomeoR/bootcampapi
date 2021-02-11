const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' });

// connect ot db
connectDB();

//router files
const bootcamps = require('./routes/bootcamps')

//load env vars

const app = express();

//body parser
app.use(express.json());

// app.use(logger)
// dev logging middleware from morgan instead of the above homemade logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  }

// mount routers
app.use('/api/v1/bootcamps', bootcamps)





const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold),
);

// handle unhandled promise rejections
process.on('unhandled rejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // close server, exit the process and crash the app
  server.close(() => process.exit(1))
})