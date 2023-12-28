const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db")
const { Course } = require("../db")
const adminRouter = express.Router();

// Admin Routes
adminRouter.post('/signup', async (req, res) => {

    console.log('Received signup request:', req.body);
    
    const {username, password } = req.body;

    const admin = new Admin({ username, password });
    await admin.save();
  
    res.status(200).json({ message: 'Admin created successfully' });
});

adminRouter.post('/courses', adminMiddleware, async (req, res) => {

    console.log('Received signup request. body:', req.body);
    
    const { username, password } = req.headers;
    const { title, description, price, imageURL } = req.body;
    const { published } = true

    const course = new Course({ title, description, price, imageURL, published });
    await course.save();

    res.status(200).json({ "message": 'Course created successfully', "courseId": course.courseId });
});

adminRouter.get('/course-list', adminMiddleware, async (req, res) => {
    const courses = await Course.find({})
    // console.log(courses)
    res.status(200).json({ courses: courses.map(course => course.toJSON()) });
});

module.exports = adminRouter;