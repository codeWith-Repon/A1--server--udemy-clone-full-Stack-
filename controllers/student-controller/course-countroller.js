const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCours = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParams = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sortParams.pricing = 1;
        break;
      case "price-hightolow":
        sortParams.pricing = -1;
        break;
      case "title-atoz":
        sortParams.title = 1;
        break;
      case "title-ztoa":
        sortParams.title = -1;
        break;

      default:
        sortParams.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParams);

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id, studentId } = req.params;

    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No courses details found",
        data: null,
      });
    }

    //check if the student purchased this course or not

    const studentCourses = await StudentCourses.findOne({ userId: studentId });

    // console.log(studentCourses, "StudentCourses")

    // console.log(studentId,"studentId", id, "id" )

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
    console.log(
      ifStudentAlreadyBoughtCurrentCourse,
      "ifStudentAlreadyBoughtCurrentCourse"
    );

    res.status(200).json({
      success: true,
      data: courseDetails,
      isCoursePurchased: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getAllStudentViewCours, getStudentViewCourseDetails };
