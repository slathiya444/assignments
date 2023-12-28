const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://slathiya444:88312318@testdemo01.vjdumwf.mongodb.net/');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
      },
    password: {
        type: String,
        required: true,
        trim: true
      }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
      },
    password: {
        type: String,
        required: true,
        trim: true
      }
});

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
    description: {
        type: String,
        required: true,
        trim: true
      },
    price: {
        type: Number,
        required: true,
        trim: true
      },
    imageURL: {
        type: String,
        required: true,
      },
    published: {
        type: Boolean,
        default: true
      }
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}