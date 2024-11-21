require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index.js");
const mediaRouters = require("./routes/instructor-routes/media-routes.js");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes.js");
const studentViewCourseRotes = require("./routes/student-routes/course-routes.js");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes.js");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-route.js");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

//routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRouters);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRotes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses", studentCoursesRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
