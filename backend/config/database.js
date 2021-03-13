const mongooes = require('mongoose');

const connectDatabase = () => {
  mongooes
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) =>
      console.log(`MongoDb Connected with HOST: ${con.connection.host}`)
    );
};

module.exports = connectDatabase;
