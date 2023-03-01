const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected mongoose success!...'))
  .catch((err) => console.log(`Error: connect:::`, err));

mongoose.connection.on('connected', () => {
  console.log('MongoDb connect to db!');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDb disconnect to db!');
});

mongoose.connection.on('Error', (err) => {
  console.log(error.message);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit();
});

module.exports = mongoose;
