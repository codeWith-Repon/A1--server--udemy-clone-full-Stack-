const express = require("express");
const {
  getAllStudentViewCours,
  getStudentViewCourseDetails,
} = require("../../controllers/student-controller/course-countroller");
const router = express.Router();

router.get("/get", getAllStudentViewCours);
router.get("/get/details/:id", getStudentViewCourseDetails);

module.exports = router;
