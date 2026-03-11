const mongoose = require('mongoose')

const connectDb = async () => {
  //This is used to catch any error during connection
  try {

    console.log('Lets connect you to MongoDB...')
    console.log('...in just a few seconds!🤌🏻🤌🏻')
    await mongoose.connect(process.env.MONGODB_URI) //{serverSelectionTimeoutMS: 5000})
    console.log('MongoDb Connected!! 😍😍')
    
  } catch (error) {
    //Error is displayed here if it fails to connect to the db
    console.log(`Cannot connect to the database : ${error}`)
  }
}

module.exports = connectDb
