import mongoose from 'mongoose';

const uri = 'mongodb+srv://root:test@cluster0.zpcrp.mongodb.net/ecommerce?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export default function databaseConnection() {
	mongoose.connect(uri, options).then(() => {
	  console.log(`Succesfully connected to MongoDB`);
	}).catch(err => {
		console.log(`Error connecting to MongoDB. ${err}.`);
	});
}

