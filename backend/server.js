const app = require('./app');

const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
//handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server duo to Uncaught exception');
  process.exit(1);
});

//setting up config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

// connect databse
connectDatabase();

//setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server duo to Unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
