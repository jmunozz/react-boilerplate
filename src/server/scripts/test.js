import mongoose from 'mongoose';
import moment from 'moment';


const roomIds = [
  '5aaeb428734d1d1b82890d8e',
  '5aaee8fc734d1d1b828917fd',
  '5aaee913734d1d1b82891802',
  '5aaee922734d1d1b8289180e',
  '5aaee934734d1d1b8289181b'];

mongoose.Promise = Promise;


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

  return Booking.find({
    $or: [{
      from: {
        $gte: moment(),
        $lte: moment('2018-03-19T12:59:59.000Z'),
      },
    }, {
      to: {
        $gte: moment(),
        $lte: moment('2018-03-19T13:00:00.000Z'),
      }
    }]
  }).then((bookings) => {
    console.log(bookings);
  });
});
