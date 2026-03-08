const validatorEnrollment = (req, res, next) => {
    const { student_name, course_id } = req.body;
    if (!student_name || !course_id) {
        return res.status(400).json({ message: "student_name and course_id are required" });
    }
    next();
};
module.exports = validatorEnrollment;