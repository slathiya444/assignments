const express = require("express");
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const { Course } = require("../db");
const userRouter = express.Router();


// User Routes
userRouter.post('/signup', userMiddleware, async (req, res) => {
    const {username, password } = req.body;

    const user = new User({ username, password });
    await user.save();
  
    res.status(200).json({ message: 'User created successfully' });
});

userRouter.get('/courses',userMiddleware,  (req, res) => {
    const { username, password } = req.headers;
    
    const courses = Course.find({});
    res.status(200).json({courses: courses})
});

userRouter.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const { authenticatedUser } = req;

    try {
        // Check if the course exists
        const course = await Course.findById(courseId);

        if (!course) {
        return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the user has already purchased the course
        if (authenticatedUser.purchasedCourses.includes(courseId)) {
            return res.status(400).json({ error: 'Course already purchased' });
        }
  
        // Update user's purchasedCourses and save to the database
        authenticatedUser.purchasedCourses.push(courseId);
        await authenticatedUser.save();
  
        res.json({ message: 'Course purchased successfully' });
    }
    catch (error) {
        console.error('Error during course purchase:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

userRouter.get('/purchasedCourses', userMiddleware, async (req, res) => {
    
    const { authenticatedUser } = req;

    try {
      // Fetch user's purchased courses from the database
      const purchasedCourses = await Course.find({ _id: { $in: authenticatedUser.purchasedCourses } });
  
      res.json({ purchasedCourses });
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = userRouter;
