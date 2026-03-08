const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
// const logger = require('../middleware/logger');
const validatorEnrollment = require('../middleware/validatorEnrollment');

// Get all courses
router.get('/courses', async (req, res) => {
    const { data, error } = await supabase.from('courses').select('*');

    if (error) {
        return res.status(500).json({ message: "Error fetching courses", error });
    }
    res.json(data);
});

// POST Enroll a student in a course
router.post('/enroll', validatorEnrollment, async (req, res) => {
    const { student_name, course_id } = req.body;

    const { data, error } = await supabase.from('enrollments').insert([{ student_name, course_id }]);

    if (error) {
        return res.status(500).json({ message: "Error enrolling student", error });
    }

    res.json({ message: "Student enrolled successfully", enrollment: data[0] });
});

// GET enrollment for courses
router.get('/courses/:id/enrollments', async (req, res) => {
    const courseId = req.params;

    const { data, error } = await supabase.from('enrollments').select('*').eq('course_id', courseId);

    if (error) {
        return res.status(500).json({ message: "Error fetching enrollments", error });
    }

    res.json(data);
});

module.exports = router;