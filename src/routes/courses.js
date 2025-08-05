const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);

module.exports = router;
