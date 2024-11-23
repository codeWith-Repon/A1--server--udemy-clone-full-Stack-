const express = require("express");
const {
  getAllStudentViewCours,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controller/course-countroller");
const router = express.Router();

router.get("/get", getAllStudentViewCours);
router.get("/get/details/:id", getStudentViewCourseDetails);
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

module.exports = router;
