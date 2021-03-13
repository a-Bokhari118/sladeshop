const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server duo to Uncaught exception');
  process.exit(1);
});

//setting up config
dotenv.config({ path: 'backend/config/config.env' });

// connect databse
connectDatabase();
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
