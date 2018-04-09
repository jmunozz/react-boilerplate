import mongoose from 'mongoose';
import moment from 'moment';


mongoose.Promise = Promise;


function getRandomDay() {
  return Math.floor((Math.random() * 31) + 1);
}

function getRandomHours() {
  return 8 + Math.floor((Math.random() * 12) + 1);
}

function getRandomRoomId() {
  const roomIds = [
    '5aaeb428734d1d1b82890d8e',
    '5aaee8fc734d1d1b828917fd',
    '5aaee913734d1d1b82891802',
    '5aaee922734d1d1b8289180e',
    '5aaee934734d1d1b8289181b'];
  const index = Math.floor((Math.random() * 4));
  return roomIds[index];
}


// Connection
mongoose.connect('mongodb://jmunoz:stationF@ds115729.mlab.com:15729/stationf');
mongoose.connection.on('connected', () => {
  console.log('Mongodb connected');
  mongoose.connection.on('disconnected', () => console.log('Mongodb disconnected'));
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDb disconnected through app termination');
      process.exit(1);
    });
  });

  const { Schema } = mongoose;
  const Booking = mongoose.model('Booking', new Schema({
    name: String,
    user: String,
    description: String,
    from: Date,
    to: Date,
    roomId: String,
    createdAt: Date,
    updatedAt: Date,
  }), 'Bookings');

  for (let i = 0; i < 10; i++) {
    const randomDay = getRandomDay();
    const randomHour = getRandomHours();
    const b = new Booking({
      name: 'Random Name',
      user: 'Random User',
      description: 'Random description',
      roomId: getRandomRoomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      from: moment().month(2).date(randomDay).hours(randomHour)
        .minutes(0)
        .seconds(0)
        .milliseconds(0),
      to: moment().month(2).date(randomDay).hours(randomHour + 2)
        .minutes(0)
        .seconds(0)
        .milliseconds(0),
    });
    b.save()
      .then(r => console.log('object saved:', b.inspect()))
      .catch(e => console.log(e));
  }
});
