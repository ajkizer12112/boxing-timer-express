const express = require("express");

const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const user = require('./routes/user');
const profile = require("./routes/profile");
const completedWorkout = require("./routes/completedWorkout")

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
//enable CORS
app.use(cors());

// Body Parser
app.use(express.json());

//security
app.use(mongoSanitize());

//set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());


// rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000,
});



app.use(limiter);

app.use(hpp());





//dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(errorHandler);



//MOUNT ROUTERS
// ex: app.use("/api/v1/tasklists", taskList);
app.use("/api/v1/auth", user)
app.use("/api/v1/profiles", profile)
app.use("/api/v1/completedWorkouts", completedWorkout)
const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//handle unhandled promise rejections

process.on("unHandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);

    server.close(() => process.exit(1));
});
